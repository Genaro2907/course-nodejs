import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod, paymentMethodConverter } from "../models/payment-methods.model.js";

export class PaymentMethodsRepository {

    private collection: CollectionReference<PaymentMethod>;
    constructor(){
        this.collection = getFirestore().collection("payment-methods").withConverter(paymentMethodConverter)
    }

    async getall(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getById(id: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(id).get();
        return  doc.data() ?? null;
    }

    async create(paymentmethod: PaymentMethod) {
        await this.collection.add(paymentmethod);
    }

    async update(paymentmethod: PaymentMethod) {
        await this.collection
            .doc(paymentmethod.id)
            .set(paymentmethod);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
