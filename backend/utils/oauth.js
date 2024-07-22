const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const generatePassword = require('generate-password');



const User = require('../models/userModel');
const generateToken = require('./generateToken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
    // console.log(profile);
    try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        } else {
            const email = profile.emails[0].value || "";

            ///generate password for new user
            const passwordConfig = {
                length: 12,
                numbers: true,
                symbols: true,
                uppercase: true,
                excludeSimilarCharacters: true,
            };
            const generatePasswordString = generatePassword.generate(passwordConfig);

            const newUser = new User({
                name: profile.displayName,
                email: email,
                googleId: profile.id,
                password: 'test123', //chang latter
                isAdmin: false
            });
            if (newUser) {
                generateToken(request.res, newUser._id); 
                const savedUser = await newUser.save();
                // console.log(savedUser)
                return done(null, savedUser);
            }

        }
    } catch (error) {
        return done(error, null);
    }
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


