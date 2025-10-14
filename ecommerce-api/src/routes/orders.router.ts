import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { newOrderSchema, searchOrderQuerySchema } from "../models/order.model.js";
import { OrderController } from "../controllers/orders.controller.js";
import expressAsyncHandler from "express-async-handler";

export const orderRoutes = Router();

orderRoutes.post("/orders",celebrate({ [Segments.BODY]: newOrderSchema }), expressAsyncHandler(OrderController.save));
orderRoutes.get("/orders",celebrate({ [Segments.QUERY]: searchOrderQuerySchema }), expressAsyncHandler(OrderController.search));
