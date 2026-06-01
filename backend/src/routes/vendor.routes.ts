import { Router } from "express";
import { CreateProfile, GetProfile, UpdateProfile } from "../controllers/vendor.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// All vendor routes require authentication and VENDOR role
router.use(authenticate, authorize("VENDOR"));

router.post("/profile", CreateProfile);
router.get("/profile", GetProfile);
router.put("/profile", UpdateProfile);

export default router;
