export default (req, res, next) => {
  if (!req.user || req.user.role !== "MANAGER") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};
