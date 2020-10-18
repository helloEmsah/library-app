exports.authAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(500).send({ error: { message: "You Have No Access" } });
  }
  next();
};
