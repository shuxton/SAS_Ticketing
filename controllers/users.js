const User = require('../models/user');
const passport = require('passport')


module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        var user = new User({
            username: req.body.username,
            displayName: req.body.displayName,
            type:req.body.type,
        });
        await User.register(user, req.body.password);

        await user.save();
        req.flash('success', 'Sign up successful!');

        res.redirect('/login');
    } catch (e) {
        req.flash('error', "Given username is already registered");
        res.redirect('/register2203');
    }
}



module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {

    passport.authenticate("local",{ failureFlash: true, failureRedirect: '/login' })(req, res, function () {
            req.flash('success', 'Welcome back!')
            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo;
            res.redirect(redirectUrl);
          })
        }
    


module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
}