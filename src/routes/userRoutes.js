import { Router } from "express";
import userController from "../controllers/userController.js";
import userIsManager from "../middlewares/userIsManager.js";
import userCreateRequest from "../requests/userCreateRequest.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import userIsActive from "../middlewares/userIsActive.js";
import userUpdateRequest from "../requests/userUpdateRequest.js";
import canUpdateUser from "../middlewares/canUpdateUser.js";

const router = Router();

router.use(authenticateToken);

router.patch("/update/:id", canUpdateUser, userUpdateRequest, userController.update);

router.use(userIsManager);
router.use(userIsActive);

router.post("/create", userCreateRequest, userController.store);

export default router;
