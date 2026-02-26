import {Router} from "express"

import { createCategory } from "./category.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";


const router = Router();

router.post("/create-category",verifyToken, createCategory);

export default router;