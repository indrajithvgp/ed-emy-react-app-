import expressJwt from 'express-jwt'
import User from "../models/user";
import Course from "../models/course";
// function logCookies() {
//   //only cookies created without this parameters may appear here
//   //httpOnly: true,
//   // secure: true, // only works on https
//   console.log("login logCookies _csrf", Cookies.get("_csrf"));
//   console.log("login logCookies ALL", Cookies.get());
// }

// function req_cookies_token(req) {
//   let err_message = "";
//   if (!req.cookies.token)
//     err_message = "<----------------*************************************";
//   console.log("index requireSignin TOKEN", req.cookies.token, err_message);
//   logCookies();
//   return req.cookies.token;
// }

// export const requireSignIn = expressJwt({
//   getToken: (req, res) => req_cookies_token(req),
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
//   userProperty: "auth",
// });

export const requireSignIn = expressJwt({
    getToken:(req, res)=>{
        return req.cookies.token;  
    },
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

export const isInstructor = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id).exec()
        // if(!user.role.includes['Instructor']) {
        //     return res.sendStatus(403)
        // }
        next()
    }catch(err){
        console.log(err)
    }
}

export const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const course = await Course.findOne({ slug: req.params.slug }).exec();
    let ids = []
    for(let i=0; i<user.courses.length; i++){
        ids.push(user.courses[i].toString())
    }
    if(!ids.includes(course._id.toString())) {
        return res.sendStatus(403)
    }else{
        next()
    }
  } catch (err) {
    console.log(err);
  }
};