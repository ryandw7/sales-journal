const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy((username, password, cb)=>{
    db.users.findByUsername(username, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        if (user.password != password) {
          return cb(null, false);
        }
        return cb(null, user);
      })
}))