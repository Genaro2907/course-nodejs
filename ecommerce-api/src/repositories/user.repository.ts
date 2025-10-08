import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model.js";

export class UserRepository {

    private collection: CollectionReference;
    constructor(){
        this.collection = getFirestore().collection("users")
    }

    async getall(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];
    }

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        if(doc.exists) { 
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            return null;
        }
    }

    async create(user: User) {
        delete user.password;
        await this.collection.doc(user.id).set(user);
    }

    async update(user: User) {
        let docRef =  this.collection.doc(user.id);

        await docRef.set({
            name: user.name,
            email: user.email
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}