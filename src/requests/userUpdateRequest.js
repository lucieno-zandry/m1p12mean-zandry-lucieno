import { body } from "express-validator";

export default [
  body("email").optional().isEmail(),
  body("password")
    .optional()
    .isLength({ min: 6 }),
  body("name").optional(),
  body("role")
    .optional()
    .isIn(["CLIENT", "MECHANIC", "MANAGER"]),
  body("isActive").optional().isBoolean(),
];
