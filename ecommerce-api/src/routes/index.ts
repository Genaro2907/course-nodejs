import express from "express";
import { userRouter } from "./users.router.js";
import { authRouter } from "./auth.router.js";
import { companiesRouter } from "./companies.router.js";

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb"}));
    app.use(authRouter);
    app.use(userRouter);
    app.use(companiesRouter);
}