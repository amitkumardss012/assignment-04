import { Router } from "express";
import { Login, Logout, Me } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", authenticate, Me);

export default router;
