import express, { Request, Response } from "express";

const app = express();

app.get( "/", (req: Request ,res: Response) => {
    res.send("Bem vindo ao curso de nodeJS!")
});


app.get("/users", (req: Request ,res: Response) => {
    let usuarios = [{
        nome: "Gabriel",
        idade: 24
    },
    {
        nome: "Genaro",
        idade: 26
    }]

    res.send(usuarios)
});

app.listen(3001, () => {
    console.log("O Servidor está ativo!!");
});