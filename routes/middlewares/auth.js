exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated())
      return next();
  req.session.redirectTo = req.url;
  res.redirect('/login');
}