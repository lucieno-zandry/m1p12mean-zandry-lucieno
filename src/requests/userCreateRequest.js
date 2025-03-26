import { body } from "express-validator";

export default [
  body("email").exists().isEmail().withMessage("Enter a valid email address"),
  body("password")
    .exists()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").exists().notEmpty().withMessage("Name is required"),
  body("role")
    .optional()
    .isIn(["CLIENT", "MECHANIC", "MANAGER"])
    .withMessage("The role is not valid."),
];
