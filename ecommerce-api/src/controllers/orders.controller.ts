import { Request, Response } from "express";

export class OrderController {
    static async save(req: Request, res: Response) {
        console.log(req.body);
        res.send(req.body)

    }
}