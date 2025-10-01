import { Request, Response } from "express";

type User = {
    id: number 
    name: string 
    email: string
};
let id = 0;
let usuarios: User[] = [];

export class UsersController {
    static getAll(req: Request ,res: Response) {
        res.send(usuarios);
    }

    static getById (req: Request, res: Response)  {
        let userId = Number(req.params.id);
        let user = usuarios.find(user => user.id === userId);
    
        res.send(user);
    }

    static create (req: Request, res: Response)  {
        let user = req.body;
        user.id = ++id;
        usuarios.push(user);
        res.send({
            message: "Usuário criado com sucesso!"
        })
    }

    static update (req: Request, res: Response) {
        let userId = Number(req.params.id);
        let user = req.body;
        let indexOf = usuarios.findIndex((_user: User) => _user.id === userId);
        usuarios[indexOf].name = user.name;
        usuarios[indexOf].email = user.email;
        res.send({
            message: "Usuario alterado com sucesso!"
        });
    }

    static delete  (req: Request, res: Response)  {
        let userId = Number(req.params.id);
        let indexOf = usuarios.findIndex((user: User) => user.id === userId);
        usuarios.splice(indexOf, 1);
        res.send({
            message: "Usuario excluido com sucesso!"
        })
    }
}