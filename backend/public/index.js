import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Resilient path resolution for Vercel Serverless
const cwd = process.cwd();
let distPath = path.join(cwd, "dist");
if (!fs.existsSync(distPath)) {
    if (fs.existsSync(path.join(cwd, "backend", "dist"))) {
        distPath = path.join(cwd, "backend", "dist");
    }
    else if (fs.existsSync(path.join(__dirname, "..", "dist"))) {
        distPath = path.join(__dirname, "..", "dist");
    }
    else if (fs.existsSync(path.join(__dirname, "../../dist"))) {
        distPath = path.join(__dirname, "../../dist");
    }
}
// Serve static files
app.use(express.static(distPath));
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});
app.use(errorMiddleware);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=index.js.map