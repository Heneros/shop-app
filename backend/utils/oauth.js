const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3005/auth/google/callback",
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
    try {
        const user = User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                name: profile.displayName,
                email: profile.email,
                // password?
                isAdmin: false
            });

            const savedUser = await newUser.save();
            return done(null, savedUser);
        }
    } catch (error) {
        return done(error, null);
    }
    // return done(null, profile)
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});