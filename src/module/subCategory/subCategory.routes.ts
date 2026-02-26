import { Router } from "express";
import { createSubCategory,getSubCategory } from "./subCategory.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const  router = Router()

router.post("/create-sub-category",verifyToken, createSubCategory);
router.get("/get-sub-category",verifyToken,  getSubCategory)

export default router

