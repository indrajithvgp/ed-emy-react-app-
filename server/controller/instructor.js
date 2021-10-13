import User from "../models/user";
import queryString from "query-string";
import Course from "../models/course";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const makeInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({
        type: "express",
      });
      user.stripe_account_id = account.id;
      user.save();
    }

    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });
    console.log("1", accountLink);

    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });
    console.log("2", accountLink);

    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    console.log("Make_instructor_error: ", err);
  }
};

export const getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    console.log("account", account);
    if (!account.charges_enabled) {
      return res.status(401).send("Unauthorized");
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "Instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec();
      res.json(statusUpdated);
    }
  } catch (err) {
    console.log(err);
  }
};

export const currentInstructor = async (req, res) => {

  try { 
    const user = await User.findById(req.user._id)
      .select("-password")
      .exec();
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      return res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const instructorCourses = async (req, res) => {
  try{
    const courses = await Course.find({instructor: req.user._id})
    .sort({createdAt: -1})
    .exec()
    res.json(courses)
  }catch(err){
    console.log(err)
  }
}