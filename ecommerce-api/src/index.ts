import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get( "/", (req: Request ,res: Response) => {
    res.send("Bem vindo ao curso de nodeJS!")
});

let usuarios = [{
    nome: "Gabriel",
    idade: 24
},
{
    nome: "Genaro",
    idade: 26
}]

app.get("/users", (req: Request ,res: Response) => {
    res.send(usuarios)
});

app.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    usuarios.push(user);
    res.send({
        message: "Usuário criado com sucesso!"
    })
})



app.listen(3001, () => {
    console.log("O Servidor está ativo!!");
});