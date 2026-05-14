import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised. Please log in." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Session expired. Please log in again." });
  }
};

export default authUser;
