export default (req, res, next) => {
  if (!req.user || !["MECHANIC", "MANAGER"].includes(req.user.role)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};
