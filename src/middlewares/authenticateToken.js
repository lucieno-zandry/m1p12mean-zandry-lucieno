import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.js";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId

    const user = await prisma.user.findUnique({
      where: {
        id: userId, // Use the userId from the token
      },
    });

    if (!user)
      return res.status(403).json({ message: "Invalid or expired token", action: "LOGIN" });

    // Attach user to the request object
    req.user = user;
    
    next();
  });
};

export default authenticateToken;
