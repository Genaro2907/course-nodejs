import { NotFoundError } from "../errors/not-found.error.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class OrderService {
    private orderRepository: OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethodRepository: PaymentMethodsRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodsRepository();
        this.productRepository = new ProductRepository();

    }

    async save (order: Order) {
        const company = await this.companyRepository.getById(order.empresa.id!);

        if(!company) {
            throw new NotFoundError("Empresa não encontrada!");
        }

        const payment = await this.paymentMethodRepository.getById(order.formaPagamento.id!);

        if(!payment) {
            throw new NotFoundError("Forma de Pagamento não encontrada!");
        }

        order.empresa = company;
        order.formaPagamento = payment;

        for (let item of order.items) {
            const product = await this.productRepository.getById(item.produto.id);

            if(!product) {
                throw new NotFoundError("Produto não encontrada!");
            }
            item.produto = product;
        }

        order.data = new Date();

        await this.orderRepository.save(order);
    }
 
    async search(query: QueryParamsOrder): Promise<Order[]> {
       return this.orderRepository.search(query);
    }
 
}