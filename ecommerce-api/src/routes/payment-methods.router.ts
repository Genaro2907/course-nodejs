import { Router } from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { PaymentMethodsController } from "../controllers/payment-methods.controller.js";
import { newPaymentSchema, updatePaymentSchema } from "../models/payment-methods.model.js";

export const paymentmethodsRouter = Router();

paymentmethodsRouter.get("/payment-methods",asyncHandler( PaymentMethodsController.getAll));
paymentmethodsRouter.get("/payment-methods/:id", asyncHandler(PaymentMethodsController.getById));
paymentmethodsRouter.post("/payment-methods",celebrate({ [Segments.BODY]: newPaymentSchema }), asyncHandler(PaymentMethodsController.create));
paymentmethodsRouter.put("/payment-methods/:id",celebrate({ [Segments.BODY]: updatePaymentSchema }), asyncHandler(PaymentMethodsController.update));
paymentmethodsRouter.delete("/payment-methods/:id",asyncHandler(PaymentMethodsController.delete));