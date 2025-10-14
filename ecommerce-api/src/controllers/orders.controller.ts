import { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";
import { Order } from "../models/order.model.js";

export class OrderController {
    static async save(req: Request, res: Response) {

        await new OrderService().save(req.body as Order)
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }
}