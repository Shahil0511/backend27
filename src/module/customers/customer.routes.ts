
import express from 'express';
import { verifyToken } from '../../middleware/auth.middleware.js';
import * as controller from './customer.controller.js';



const router = express.Router();

router.post("/create-customer", verifyToken, controller.createCustomer)
router.get("/getall-customer", verifyToken, controller.getAllCustomer)
router.get("/get-customer/:id", verifyToken, controller.getCustomerById)
export default router;