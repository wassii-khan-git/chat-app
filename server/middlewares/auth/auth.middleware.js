import { VerifyToken } from "../../utils/helper.js";

// Auth Middleware
export const VerifyUserToken = async (req, res, next) => {
  try {
    // get the token
    const rawInfo = req.header("Authorization");
    const token = rawInfo.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied",
      });
    }
    const decoded = await VerifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
