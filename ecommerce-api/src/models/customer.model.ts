import { Joi } from "celebrate";

export type Customer = {
    nome: string;
    telefone: string;
}

export const customerSchema = Joi.object().keys({
    nome: Joi.string().trim().min(5).required(),
    telefone: Joi.string().required()
})
// .regex(phoneRegexPattern)