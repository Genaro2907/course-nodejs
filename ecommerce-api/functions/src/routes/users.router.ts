import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newuserSchema, updateduserSchema } from "../models/user.model.js";

export const userRouter = Router();

userRouter.get("/users",asyncHandler( UsersController.getAll));
userRouter.get("/users/:id", asyncHandler(UsersController.getById));
userRouter.post("/users",celebrate({ [Segments.BODY]: newuserSchema }), asyncHandler(UsersController.create));
userRouter.put("/users/:id",celebrate({ [Segments.BODY]: updateduserSchema }), asyncHandler(UsersController.update));
userRouter.delete("/users/:id",asyncHandler( UsersController.delete));