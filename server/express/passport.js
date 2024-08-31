const passport = require("passport");
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy;
const {db} = require('../db/dbDeterminer.js')
let {findByUsername, findById}  = db

passport.serializeUser((user, cb) => {
  console.log("serializing...")
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log('deserializing...')
  findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, cb)=>{

    console.log("Authenticating user...")
   
    
    
}))



module.exports = passport;