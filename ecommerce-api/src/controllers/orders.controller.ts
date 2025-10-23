import { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";

export class OrderController {
    static async save(req: Request, res: Response) {

        await new OrderService().save(new Order(req.body))
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }

    static async search(req: Request, res: Response) {
        const orders = await new OrderService().search(req.query as QueryParamsOrder);
        res.status(200).send(orders);
    }
}