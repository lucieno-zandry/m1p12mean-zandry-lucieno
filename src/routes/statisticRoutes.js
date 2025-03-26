import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import userIsManager from "../middlewares/userIsManager.js";
import userIsActive from "../middlewares/userIsActive.js";
import statisticsController from "../controllers/statisticsController.js";

const router = Router();

router.use(authenticateToken);
router.use(userIsManager);
router.use(userIsActive);

router.get("/weekly-appointments", statisticsController.weeklyAppointments);

export default router;
