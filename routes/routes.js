var db = require('../app/query');
var path = require('path');

module.exports = function(app, passport){
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    });

    app.get('/api/user', isLoggedIn,function (req, res) {
        res.send({ user: req.user})
    });

    app.get('/home', isLoggedIn, function (req, res) {
        res.sendfile(path.join(__dirname, '../', 'views', 'index.html'));
        // console.log(req.user);
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/home',
            failureRedirect: '/' }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/challenge', function (req, res) {
        db.findChallenge(res);
    });
    
    app.post('/submit', function(req, res) {
        db.subAnswer(req, res);
    });

    app.get('/api/user/history', isLoggedIn, function (req, res) {
        res.send(req.user.inputs);
    });
    
    app.put('/api/user/history/update', isLoggedIn, function (req, res) {
        db.editAnswer(req, res);
    });

    app.put('/api/user/history/delete', isLoggedIn, function (req, res) {
        db.deleteAnswer(req, res);
    });

    app.delete('/api/user/history/clearhistory', isLoggedIn, function (req, res) {
        db.deleteHistory(req, res);
    });
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}