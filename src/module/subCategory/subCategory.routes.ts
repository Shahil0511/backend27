import { Router } from "express";
import { createSubCategory } from "./subCategory.controller.js";

const  router = Router()

router.post("/create-sub-category", createSubCategory)

export default router

