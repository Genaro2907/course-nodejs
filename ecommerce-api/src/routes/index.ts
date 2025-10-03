import express from "express";
import { userRouter } from "./users.router";
import { authRouter } from "./auth.router";

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRouter);
    app.use(userRouter);
}