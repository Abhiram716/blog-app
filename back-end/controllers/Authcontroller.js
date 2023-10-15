import user from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
  createAccessToken = async (req, res) => {
    try {
      const { email, password } = req.body;

      const account = await user.findOne({ email });

      if (!account) {
        return res.status(401).json({ error: "Account not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        account.hashedPassword
      );

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const payload = { accountId: account._id, email: account.email };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createAccount = async (req, res) => {
    try {
      const { email, userName, mobileNumber, gender, password } = req.body;

      const existingUser = await user.findOne({ userName });
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const existingEmail = await user.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new user({
        email,
        userName,
        mobileNumber,
        hashedPassword,
        gender,
      });

      await newUser.save();

      res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default AuthController;
