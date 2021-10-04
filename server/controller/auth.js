import User from "../models/user";
import jwt from 'jsonwebtoken'
import { comparePassword, hashPassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    const {name, email, password} = req.body
    if(!name) return res.status(400).send("Name is required")
    if(!password || password.length <6){
      return res.status(400).send("Password is required and should be min 6 characters long")
    }
    let userExist = await User.findOne({email}).exec()
    if(userExist) return res.status(400).send("Email is Taken")

    const hashedPassword = await hashPassword(password)

    const user = new User({
      name, email, password: hashedPassword
    }).save()
    console.log("Saved User", user)
    return res.json({ok: true})
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error..Try again");
  }
};

export const login = async(req, res)=>{
  const {email, password} = req.body
  
  try{
    const user = await User.findOne({email}).exec();
    if(!user) return res.status(400).send("No user found")
    const match = await comparePassword(password, user.password)
    console.log(match)
    if(!match) return res.status(400).send("Invalid Credentials")
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
      expiresIn:'77d'
    })
    user.password = undefined
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    })
    res.status(200).json(user)

  }catch(err){
    console.log(err)
     return res.status(400).json({
       error: err,
     });
    // return res.status(400).send("Error..Try again");
  }
}

export const logout = async(req, res) => {
  try{
    res.clearCookie("token")
    return res.json({message: 'Logout Success'})
  }catch(err) {
    console.log(err)
  } 
}

export const currentUser = async(req, res) => {
  console.log(req.user)
  try{
    const user = await User.findById(req.user._id).select('-password').exec();
    return res.json({ok:true})

  }catch(err){

  }
}

export const sendEmail = async(req, res)=>{
  try {
    
  } catch (err) {}
}