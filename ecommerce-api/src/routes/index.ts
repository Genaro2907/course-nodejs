import express from "express";
import { userRouter } from "./users.router";

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRouter);
}