import expressJwt from 'express-jwt'

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
        console.log(req.cookies)
        return req.cookies.token;
    },
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})