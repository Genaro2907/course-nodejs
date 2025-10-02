import express, {Request, Response, NextFunction } from "express";
import { initializeApp } from 'firebase-admin/app';
import { routes } from "./routes";

initializeApp();
const app = express();

routes(app);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({
        message: "Erro Interno do Servidor"
    });
});


app.listen(3001, () => {
    console.log("O Servidor está ativo!!");
});