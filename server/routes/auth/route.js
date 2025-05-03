import express from "express";
import { CreateAccount } from "../../controllers/auth/auth-controller.js";
import { VerifyUserToken } from "../../middlewares/auth/auth.middleware.js";

const router = express.Router();

// create user account
router.post("/create-account", CreateAccount);
// create all users
router.get("/all-users", VerifyUserToken, (req, res) => {
  res.status(200).json({ message: "everything is fine" });
});

export default router;
