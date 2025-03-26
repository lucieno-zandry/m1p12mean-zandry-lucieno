export default (req, res, next) => {
  if (!req.user?.isActive) {
    return res.status(403).json({ message: "Unauthorized", action: "ACTIVATION"});
  }

  next();
};
