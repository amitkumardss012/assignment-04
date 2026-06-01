import { Router } from "express";
import { Register, Login, Logout, Me } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", authenticate, Me);
export default router;
//# sourceMappingURL=auth.routes.js.map