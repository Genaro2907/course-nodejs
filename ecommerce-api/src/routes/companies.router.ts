import { Router } from "express";
import { CompaniesController } from "../controllers/companies.controller.js"
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newcompanySchema, updatecompanySchema } from "../models/company.model.js";

export const companiesRouter = Router();

companiesRouter.get("/companies",asyncHandler( CompaniesController.getAll));
companiesRouter.get("/companies/:id", asyncHandler(CompaniesController.getById));
companiesRouter.post("/companies",celebrate({ [Segments.BODY]: newcompanySchema }), asyncHandler(CompaniesController.create));
companiesRouter.put("/companies/:id",celebrate({ [Segments.BODY]: updatecompanySchema }), asyncHandler(CompaniesController.update));