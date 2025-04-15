import jtw from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ sucess: false, message: "Not authorized" });
    }
    const token_decode = jtw.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ sucess: false, message: "Not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export default adminAuth;

// import jwt from "jsonwebtoken";

// const adminAuth = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "Not authorized" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
//     if (decoded !== expected) {
//       return res.status(403).json({ success: false, message: "Forbidden access" });
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ success: false, message: "Token error: " + error.message });
//   }
// };

// export default adminAuth;
