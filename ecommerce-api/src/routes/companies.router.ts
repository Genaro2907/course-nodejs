import { Router } from "express";
import { CompaniesController } from "../controllers/companies.controller"
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { companySchema } from "../models/company.model";

export const companiesRouter = Router();

companiesRouter.get("/companies",asyncHandler( CompaniesController.getAll));
companiesRouter.get("/companies/:id", asyncHandler(CompaniesController.getById));
companiesRouter.post("/companies",celebrate({ [Segments.BODY]: companySchema }), asyncHandler(CompaniesController.create));
companiesRouter.put("/companies/:id",celebrate({ [Segments.BODY]: companySchema }), asyncHandler(CompaniesController.update));