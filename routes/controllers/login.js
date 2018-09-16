const AWS = require('aws-sdk');
const config = require('../../config/config');
module.exports = (app,passport) => {
  app.get('/login',(req,res)=>{
    res.render('login')
  })
  app.post('/login',passport.authenticate('local', { failureRedirect: '/login/?auth=false' }),
    function(req, res) {
      console.log(req.session);
      var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
      delete req.session.redirectTo;
      res.redirect(redirectTo);
  });
  app.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/login'); 
    });
  });
};
