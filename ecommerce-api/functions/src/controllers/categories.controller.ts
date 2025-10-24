import { Request, Response } from "express";
import { CategoryService } from "../services/category.service.js";

export class CategoriesController {
    static  async getAll(req: Request ,res: Response) {
        res.send(await new CategoryService().getAll());
    }

    static async getById (req: Request, res: Response)  {
        let categoryId = req.params.id;
        res.send(await new CategoryService().getById(categoryId));
    }
 
    static async create (req: Request, res: Response)  {
        await new CategoryService().create(req.body);
        res.status(201).send({
            message: `Categoria criada com sucesso!`
        });
    }

    static async update (req: Request, res: Response) {
        await new CategoryService().update(req.body, req.params.id);
        res.send({
            message: "Categoria alterada com sucesso!"
        });
    }

    static async delete  (req: Request, res: Response)  {
        await new CategoryService().delete(req.params.id);
        res.status(204).end();
    }
}