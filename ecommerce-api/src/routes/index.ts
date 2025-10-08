import express from "express";
import { userRouter } from "./users.router";
import { authRouter } from "./auth.router";
import { companiesRouter } from "./companies.router";

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb"}));
    app.use(authRouter);
    app.use(userRouter);
    app.use(companiesRouter);
}