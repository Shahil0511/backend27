import express from "express";
import { signup, deleteUser, signin } from "./auth.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);
router.delete('/', verifyToken, deleteUser);

router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

export default router;
