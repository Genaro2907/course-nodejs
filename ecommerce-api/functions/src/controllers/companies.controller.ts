import { Request, Response } from "express";
import { CompanyService } from "../services/company.service.js";
export class CompaniesController {
    static  async getAll(req: Request ,res: Response) {
        res.send(await new CompanyService().getAll());
    }

    static async getById (req: Request, res: Response)  {
        const companyId = req.params.id;
        res.send(await new CompanyService().getById(companyId));
    }
 
    static async create (req: Request, res: Response)  {
        await new CompanyService().create(req.body);
        res.status(201).send({
            message: `Empresa criada com sucesso!`
        });
    }

    static async update (req: Request, res: Response) {
        const id = req.params.id
        await new CompanyService().update(id, req.body);
        res.send({
            message: "Empresa alterada com sucesso!"
        });
    }
}