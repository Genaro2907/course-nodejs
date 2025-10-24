import { Request, Response } from "express";
import { PaymentMethodsService } from "../services/payment-methods.service.js";

export class PaymentMethodsController {
    static  async getAll(req: Request ,res: Response) {
        res.send(await new PaymentMethodsService().getAll());
    }

    static async getById (req: Request, res: Response)  {
        const paymentmethodId = req.params.id;
        res.send(await new PaymentMethodsService().getById(paymentmethodId));
    }
 
    static async create (req: Request, res: Response)  {
        await new PaymentMethodsService().create(req.body);
        res.status(201).send({
            message: `Forma de Pagamento criada com sucesso!`
        });
    }

    static async update (req: Request, res: Response) {
        await new PaymentMethodsService().update(req.body, req.params.id);
        res.send({
            message: "Forma de Pagamento alterada com sucesso!"
        });
    }

    static async delete  (req: Request, res: Response)  {
        await new PaymentMethodsService().delete(req.params.id)
        res.status(204).end();
    }
}