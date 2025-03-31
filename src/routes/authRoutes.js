import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import authController from "../controllers/authController.js";
import userCreateRequest from "../requests/userCreateRequest.js";
import loginRequest from "../requests/loginRequest.js";

const router = Router();

router.post("/signup", userCreateRequest, authController.signup);
router.post("/login", loginRequest, authController.login);
router.get("/user", authenticateToken, authController.profile);

export default router;
