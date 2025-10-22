import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter } from "firebase-admin/firestore";

export class User {
    id: string; 
    name: string;
    email: string;
    password?: string;

    constructor(data: User | any){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }
};

export  const newuserSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
});

export  const updateduserSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6)
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required()
})

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User): DocumentData => {
        return {
            name: user.name,
            email: user.email
        }
    },
    fromFirestore:  (snapshot: FirebaseFirestore.QueryDocumentSnapshot): User => {
        return new User({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}