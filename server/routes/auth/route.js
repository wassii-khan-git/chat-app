import express from "express";
import { CreateAccount } from "../../controllers/auth/auth-controller.js";

const router = express.Router();

// create user account
router.post("/create-account", CreateAccount);

export default router;
