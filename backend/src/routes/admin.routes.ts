import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { getDashboardStats, getAllVendors, getVendorDetails, createVendor } from "../controllers/admin.controller.js";

const router = Router();

// Protect all admin routes
router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/stats", getDashboardStats);
router.get("/vendors", getAllVendors);
router.get("/vendors/:id", getVendorDetails);
router.post("/vendors", createVendor);

export default router;
