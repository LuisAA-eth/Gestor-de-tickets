export default function admin(req, res, next) {
  console.log("User Role", req.user);
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied, Don't have permission to perform this action",
    });
  }

  next();
}
