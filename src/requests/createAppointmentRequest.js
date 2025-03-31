import { body } from "express-validator";

export default [
  body("serviceType").isString().withMessage("Service type is required"),

  body("date")
    .isISO8601()
    .withMessage(
      "Date must be a valid ISO 8601 date (e.g., 2025-03-15T10:00:00Z)"
    ),

  body("notes").optional().isString().withMessage("Notes must be a string"),

  body("mechanicId").optional().isString(),
];
