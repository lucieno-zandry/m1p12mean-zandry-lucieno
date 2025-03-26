import { Router } from "express";
import createAppointmentRequest from "../requests/createAppointmentRequest.js";
import appointmentsController from "../controllers/appointmentsController.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import userIsMechanicOrManager from "../middlewares/userIsMechanicOrManager.js";
import appointmentStatusChangeRequest from "../requests/appointmentStatusChangeRequest.js";
import userIsActive from "../middlewares/userIsActive.js";
import userIsManager from "../middlewares/userIsManager.js";
import updateAppointmentRequest from "../requests/updateAppointmentRequest.js";

const router = Router();

router.use(authenticateToken);

router.post("/create", createAppointmentRequest, appointmentsController.store);
router.put("/update/:id", updateAppointmentRequest, appointmentsController.store);
router.get("/my", appointmentsController.index);

router.use(userIsMechanicOrManager);
router.use(userIsActive);

router.get("/assigned", appointmentsController.index);
router.patch(
  "/:id/status",
  appointmentStatusChangeRequest,
  appointmentsController.updateStatus
);

router.get('/all', userIsManager, appointmentsController.all);

export default router;
