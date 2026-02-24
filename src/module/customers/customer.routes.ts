
import  express  from 'express';
import { verifyToken } from '../../middleware/auth.middleware.js';
import * as controller from './customer.controller.js';



const router = express.Router();

router.post("/create-customer", verifyToken, controller.createCustomer)
router.get("/",verifyToken,controller.getCustomer)
export default router;