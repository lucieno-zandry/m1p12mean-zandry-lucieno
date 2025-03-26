import { body } from "express-validator";

export default [
  body("status")
    .isIn(["PENDING", "IN_PROGRESS", "DONE", "CANCELLED"])
    .withMessage(
      "Status must be one of : PENDING, IN_PROGRESS, DONE, CANCELLED"
    ),
];
