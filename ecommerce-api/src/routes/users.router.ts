import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/user.model.";

export const userRouter = Router();

userRouter.get("/users",asyncHandler( UsersController.getAll));
userRouter.get("/users/:id", asyncHandler(UsersController.getById));
userRouter.post("/users",celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.create));
userRouter.put("/users/:id",celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.update));
userRouter.delete("/users/:id",asyncHandler( UsersController.delete));