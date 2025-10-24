import { NotFoundError } from "../errors/not-found.error.js";
import { OrderItem } from "../models/order-item.model.js";
import { Order, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
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

        for (const item of order.items!) {
            const product = await this.productRepository.getById(item.produto.id);

            if(!product) {
                throw new NotFoundError("Produto não encontrada!");
            }
            item.produto = product;
        }

        await this.orderRepository.save(order);
    }
 
    async search(query: QueryParamsOrder): Promise<Order[]> {
       return this.orderRepository.search(query);
    }
 
    async getItems(pedidoId: string): Promise<OrderItem[]> {
        return this.orderRepository.getItems(pedidoId);
    }

    async getbyId(orderId: string): Promise<Order> {
        return this.orderRepository.getbyId(orderId);
    }

    async changeStatus(orderId: string, status: OrderStatus){
        return this.orderRepository.changeStatus(orderId, status);
    }
 
}