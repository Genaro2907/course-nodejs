import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payment-methods.model.js";

export class PaymentMethodsRepository {

    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("payment-methods")
    }

    async getall(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as PaymentMethod[];
    }

    async getById(id: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(id).get();
        if(doc.exists) { 
            return {
                id: doc.id,
                ...doc.data()
            } as PaymentMethod;
        } else {
            return null;
        }
    }

    async create(paymentmethod: PaymentMethod) {
        await this.collection.add(paymentmethod);
    }

    async update(paymentmethod: PaymentMethod) {
        let docRef =  this.collection.doc(paymentmethod.id!);
        delete paymentmethod.id;
        await docRef.set({
            descricao: paymentmethod.descricao,
            ativa: paymentmethod.ativa
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
