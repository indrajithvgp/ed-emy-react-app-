import express from "express";
import { register, login, logout, currentUser, sendEmail } from "../controller/auth";
import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import { requireSignIn } from "../middlewares";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is Taken");

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    console.log("Saved User", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error..Try again");
  }
});

router.post('/login', login)
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);
router.get("/send-email", sendEmail);

module.exports = router;