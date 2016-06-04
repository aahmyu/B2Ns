var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/user');
var configAuth = require('../config/auth');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['emails', 'displayName', 'gender', 'picture', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            process.nextTick(function () {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if(err)
                        return done(err);
                    if(user){
                        if(!user.facebook.token){
                            user.facebook.token = accessToken;
                            user.facebook.fullName = profile.displayName;
                            user.facebook.firstName = profile.name.givenName;
                            user.facebook.avatar = profile.photos[0].value;
                            user.facebook.email = profile.emails[0].value;
                            user.save(function (err) {
                                if(err)
                                    throw err;
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    }
                    else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.fullName = profile.displayName;
                        newUser.facebook.firstName = profile.name.givenName;
                        newUser.facebook.avatar = profile.photos[0].value;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.save(function (err) {
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

};

