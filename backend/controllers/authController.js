const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
});

exports.logout = (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
};
