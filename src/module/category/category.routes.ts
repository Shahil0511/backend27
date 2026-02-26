import {Router} from "express"

import { createCategory,getCategory } from "./category.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";


const router = Router();

router.post("/create-category",verifyToken, createCategory);
router.get("/get-category",verifyToken, getCategory);

export default router;