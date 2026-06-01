import { Router } from "express";
import { GetStats, GetUpcomingEvents, GetRecentActivity } from "../controllers/dashboard.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();
// Only vendors can access dashboard data
router.use(authenticate, authorize("VENDOR"));
router.get("/stats", GetStats);
router.get("/upcoming-events", GetUpcomingEvents);
router.get("/recent-activity", GetRecentActivity);
export default router;
//# sourceMappingURL=dashboard.routes.js.map