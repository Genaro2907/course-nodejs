import { Router } from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newProductSchema, updateProductSchema } from "../models/product.model.js";
import { ProductsController } from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.get("/product",asyncHandler( ProductsController.getAll));
productsRouter.get("/product/:id", asyncHandler(ProductsController.getById));
productsRouter.post("/product",celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.create));
productsRouter.put("/product/:id",celebrate({ [Segments.BODY]: updateProductSchema }), asyncHandler(ProductsController.update));
productsRouter.put("/product/:id",asyncHandler(ProductsController.delete));