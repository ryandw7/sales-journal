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
   
    
    findByUsername(username, async function (err, user) {
      const matchedPassword = await bcrypt.compare(password, user.pw);
        if (err) {
          console.log(err)
          return cb(err);
        }
        if (!user) {
        console.log('!user')
          return cb(null, false);
        }
        if (!matchedPassword) {
          console.log(matchedPassword, password, user.pw)
          return cb(null, false);
        }
        return cb(null, user);
      })
}))



module.exports = passport;