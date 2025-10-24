import { Router } from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newProductSchema, updateProductSchema, searchQuerySchema } from "../models/product.model.js";
import { ProductsController } from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.get("/product",asyncHandler( ProductsController.getAll));
productsRouter.get("/product/search",celebrate({ [Segments.QUERY]: searchQuerySchema}),asyncHandler( ProductsController.search));
productsRouter.get("/product/:id", asyncHandler(ProductsController.getById));
productsRouter.post("/product",celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.create));
productsRouter.put("/product/:id",celebrate({ [Segments.BODY]: updateProductSchema }), asyncHandler(ProductsController.update));
productsRouter.delete("/product/:id",asyncHandler(ProductsController.delete));