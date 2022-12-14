"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
// const { getUserLogin } = require("../models/userModel");
const { getUserByEmail } = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

// local strategy for username password login
// passport.use(
//     new Strategy(async (email, password, done) => {
//       const username = [email];
//       try {
//         // const [user] = await getUserLogin(params);
//         const user = await getUserByEmail(username);
//         console.log('Local strategy', user); // result is binary row
//         if (user === undefined) {
//           return done(null, false, {message: 'Incorrect email.'});
//         }
//         if (user.Password !== password) {
//           return done(null, false, {message: 'Incorrect password.'});
//         }
//         // use spread syntax to create shallow copy to get rid of binary row type
//         return done(null, {...user}, {message: 'Logged In Successfully'});
//       } catch (err) {
//         return done(err);
//       }
//     })
//   );
passport.use(
  new Strategy(
      {
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true
      },

      async (request, email, password, done) => {
        console.log("these are the username and password",{email, password})
          const user = await getUserByEmail(email);
          console.log(user)

          if (!user) {
              return done(null, false);
          }
          const passwordOK = await bcrypt.compare(password, user.Password);
          if (!passwordOK) { 
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user, { message: "Logged In Successfully" });
      }
  )
);
  
  // JWT strategy for handling bearer token
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, done) => {
        console.log(jwtPayload);
        return done(null, jwtPayload);
      }
    )
  );





// // local strategy for username password login
// passport.use(
//   new Strategy(async (email, password, done) => {
//     const params = [email];
//     try {
//       const [user] = await getUserByEmail(params);
//       console.log("Local strategy", user); 
//       if (user === undefined) {
//         console.log("this is the problem", user)
//         return done(null, false, { message: "Incorrect email." });
//       }
//       if (user.password !== password) {
//         console.log("this is the other problem", user)

//         return done(null, false, { message: "Incorrect password." });
//       }
//       // hash login password and compare it to the password hash in DB
//       const passwordOK = await bcrypt.compare(password, user.Password);
//       if (!passwordOK) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, {...user}, { message: "Logged In Successfully" });
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// // TODO: JWT strategy for handling bearer token
// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     (jwtPayload, done) => {
//       return done(null, jwtPayload);
//     }
//   )
// );
// //consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

module.exports = passport;