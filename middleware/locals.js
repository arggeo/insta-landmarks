exports.dataTransfer = (req, res, next) => {
   res.locals.userInfo = req.session.loggedState ?? null;
   res.locals.csrfToken = req.csrfToken();
   next();
}