import jwt from "jsonwebtoken";

export function checkToken(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;   // { id, name }
    req.userId = decoded.id;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
