import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import authController from "../controllers/authController.js";
import userCreateRequest from "../requests/userCreateRequest.js";
import loginRequest from "../requests/loginRequest.js";

const router = Router();

// Signup route
router.post("/signup", userCreateRequest, authController.signup);

// Login
router.post("/login", loginRequest, authController.login);

// Profile
router.get("/profile", authenticateToken, authController.profile);

export default router;
