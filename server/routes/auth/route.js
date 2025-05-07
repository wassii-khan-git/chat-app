import express from "express";
import {
  AllUsers,
  CreateAccount,
  Login,
} from "../../controllers/auth/auth-controller.js";
import { VerifyUserToken } from "../../middlewares/auth/auth.middleware.js";

const router = express.Router();

// create user account
router.post("/create-account", CreateAccount);
// login
router.post("/login", Login);
// all users
router.get("/all-users", VerifyUserToken, AllUsers);

export default router;
