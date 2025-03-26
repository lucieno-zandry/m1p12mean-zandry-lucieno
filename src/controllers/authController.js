import { validationResult } from "express-validator";
import prisma from "../../prisma/prisma.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export default {
  signup: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password, name, role = 'CLIENT' } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });

      // Generate JWT token
      const token = generateToken(newUser.id);

      // Send response with user and token
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role,
        },
        token, // Sending the token back to the client
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  profile: async (req, res) => {
    try {
      // Use req.userId to get the logged-in user from the database, for example:
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id, // Use the userId from the token
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(422).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(422).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = generateToken(user.id);

      // Exclude password from user response
      const { password: _, ...userData } = user;

      res.status(200).json({ user: userData, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
