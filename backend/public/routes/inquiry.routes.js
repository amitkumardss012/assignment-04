import { Router } from "express";
import { CreateInquiry, GetInquiries, UpdateInquiryStatus } from "../controllers/inquiry.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();
// Protect all inquiry routes
router.use(authenticate);
router.post("/", CreateInquiry);
router.get("/", GetInquiries);
router.put("/:id/status", authorize("VENDOR"), UpdateInquiryStatus);
export default router;
//# sourceMappingURL=inquiry.routes.js.map