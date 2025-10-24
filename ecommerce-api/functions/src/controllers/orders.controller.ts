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

    static async getItems(req: Request, res: Response) {
        const items = await new OrderService().getItems(req.params.id);
        res.status(200).send(items);
    } 

    static async getbyId(req: Request, res: Response) {
        const order = await new OrderService().getbyId(req.params.id);
        res.status(200).send(order);
    } 

    static async changeStatus(req: Request, res: Response) {
        await new OrderService().changeStatus(req.params.id, req.body.status);
        res.status(204).end();
    } 
}