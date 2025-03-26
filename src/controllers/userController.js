import { validationResult } from "express-validator";
import prisma from "../../prisma/prisma.js";
import bcrypt from "bcryptjs";

export default {
  store: async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role,
          isActive: true,
        },
      });

      res.status(201).json({ message: "user created", user: newUser });
    } catch (error) {
      console.error("Add user error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  update: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const userId = req.params.id;

    try {
      let user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) return res.status(404).json({ message: "User not found!" });

      const data = req.body;

      // Hash the password if changed
      if (data.password) {
        // validate the current password
        if (
          req.user.role !== "MANAGER" &&
          (!data.currentPassword ||
            !(await bcrypt.compare(data.currentPassword, user.password)))
        )
          return res.status(422).json({
            errors: [
              {
                type: "field",
                value: data.currentPassword,
                msg: "The current password does not match",
                path: "currentPassword",
                location: "body",
              },
            ],
          });

          // Delete the current password from the payload
        if (data.currentPassword) delete data.currentPassword;

        data.password = await bcrypt.hash(data.password, 10);
      }

      user = await prisma.user.update({
        where: { id: userId },
        data,
      });

      res.json({
        user,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};
