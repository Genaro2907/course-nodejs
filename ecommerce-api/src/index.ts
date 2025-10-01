import express from "express";
import { routes } from "./routes";

const app = express();

routes(app);


app.listen(3001, () => {
    console.log("O Servidor está ativo!!");
});