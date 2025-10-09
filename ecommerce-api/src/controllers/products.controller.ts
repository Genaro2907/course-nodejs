import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductsController {
    static  async getAll(req: Request ,res: Response) {
        res.send(await new ProductService().getAll());
    }

    static async getById (req: Request, res: Response)  {
        let productId = req.params.id;
        res.send(await new ProductService().getById(productId));
    }
 
    static async create (req: Request, res: Response)  {
        await new ProductService().create(req.body);
        res.status(201).send({
            message: `Produto criado com sucesso!`
        });
    }

    static async update (req: Request, res: Response) {
        await new ProductService().update(req.body, req.params.id);
        res.send({
            message: "Produto alterado com sucesso!"
        });
    }

    static async delete  (req: Request, res: Response)  {
        await new ProductService().delete(req.params.id);
        res.status(204).end();
    }
}