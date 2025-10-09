import { Router } from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newCategorySchema, updateCategorySchema } from "../models/cotegory.model.js";
import { CategoriesController } from "../controllers/categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/categories",asyncHandler( CategoriesController.getAll));
categoriesRouter.get("/categories/:id", asyncHandler(CategoriesController.getById));
categoriesRouter.post("/categories",celebrate({ [Segments.BODY]: newCategorySchema }), asyncHandler(CategoriesController.create));
categoriesRouter.put("/categories/:id",celebrate({ [Segments.BODY]: updateCategorySchema }), asyncHandler(CategoriesController.update));
categoriesRouter.put("/categories/:id",asyncHandler(CategoriesController.delete));