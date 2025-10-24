import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment-methods.model.js";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository.js";

export class PaymentMethodsService {

    private paymentMethodsRepository: PaymentMethodsRepository;

    constructor() {
        this.paymentMethodsRepository = new PaymentMethodsRepository();
    }

    async getAll(): Promise<PaymentMethod[]> {
        return this.paymentMethodsRepository.getall();
    }

    async getById(id: string): Promise<PaymentMethod> {
        const paymentmethod = await this.paymentMethodsRepository.getById(id);
        if (!paymentmethod) {
            throw new NotFoundError("Forma de Pagamento não encontrada!");
        }
        return paymentmethod;
    }

    async create(paymentmethod: PaymentMethod) {
        await this.paymentMethodsRepository.create(paymentmethod);
    }

    async update(paymentmethod: PaymentMethod, id: string) {
        const _paymentmethod = await this.getById(id);

        _paymentmethod.descricao = paymentmethod.descricao;
        _paymentmethod.ativa = paymentmethod.ativa;

        await this.paymentMethodsRepository.update(_paymentmethod);
    }

    async delete(id: string) {
        await this.paymentMethodsRepository.delete(id);
    }
}