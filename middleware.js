export function checkLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/auth/login');
    }
}
