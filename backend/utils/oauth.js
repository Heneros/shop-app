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

        }
    } catch (err) {

    }
    // return done(null, profile)
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
