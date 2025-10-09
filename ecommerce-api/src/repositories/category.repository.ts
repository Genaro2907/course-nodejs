import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/cotegory.model.js";

export class CategoryRepository {

    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("categories")
    }

    async getall(): Promise<Category[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Category[];
    }

    async getById(id: string): Promise<Category | null> {
        const doc = await this.collection.doc(id).get();
        if(doc.exists) { 
            return {
                id: doc.id,
                ...doc.data()
            } as Category;
        } else {
            return null;
        }
    }

    async create(category: Category) {
        await this.collection.add(category);
    }

    async update(category: Category) {
        let docRef =  this.collection.doc(category.id!);
        delete category.id;
        await docRef.set({
            descricao: category.descricao,
            ativa: category.ativa
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}