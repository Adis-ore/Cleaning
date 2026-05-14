import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const TOKEN_EXPIRY = "7d";

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

// POST /api/user/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("loginUser:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/user/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user    = await newUser.save();

    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("registerUser:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/user/admin
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        email + password,
        process.env.JWT_SECRET
      );
      return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: "Invalid admin credentials." });
  } catch (error) {
    console.error("adminLogin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
