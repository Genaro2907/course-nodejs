import { Request, Response } from "express";
import { UserService } from "../services/user.service";
export class UsersController {
    static  async getAll(req: Request ,res: Response) {
        res.send(await new UserService().getAll());
    }

    static async getById (req: Request, res: Response)  {
        let userId = req.params.id;
        res.send(await new UserService().getById(userId));
    }
 
    static async create (req: Request, res: Response)  {
        await new UserService().create(req.body);
        res.status(201).send({
            message: `Usuário criado com sucesso!`
        });
    }

    static async update (req: Request, res: Response) {
        await new UserService().update(req.body, req.params.id);
        res.send({
            message: "Usuario alterado com sucesso!"
        });
    }

    static async delete  (req: Request, res: Response)  {
        await new UserService().delete(req.params.id);

        res.status(204).end();
    }
}