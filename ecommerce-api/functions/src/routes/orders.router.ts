import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { changeStatusOrderSchema, newOrderSchema, searchOrderQuerySchema } from "../models/order.model.js";
import { OrderController } from "../controllers/orders.controller.js";
import expressAsyncHandler from "express-async-handler";

export const orderRoutes = Router();

orderRoutes.get("/orders",celebrate({ [Segments.QUERY]: searchOrderQuerySchema }), expressAsyncHandler(OrderController.search));
orderRoutes.post("/orders",celebrate({ [Segments.BODY]: newOrderSchema }), expressAsyncHandler(OrderController.save));
orderRoutes.get("/orders/:id/items", expressAsyncHandler(OrderController.getItems));
orderRoutes.get("/orders/:id", expressAsyncHandler(OrderController.getbyId));
orderRoutes.post("/orders/:id/status",celebrate({ [Segments.BODY]: changeStatusOrderSchema }), expressAsyncHandler(OrderController.changeStatus));
