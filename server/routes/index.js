import express from "express";
import chatRoutes from "./chat/route.js";
import authRoutes from "./auth/route.js";
// routes
const router = express.Router();

// chat routes
router.use("/chat", chatRoutes);

// auth routes
router.use("/auth", authRoutes);

// export the defualt router
export default router;
