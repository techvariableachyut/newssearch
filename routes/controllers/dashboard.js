const AWS = require('aws-sdk');
const config = require('../../config/config');
const { isLoggedIn } = require('../middlewares/auth')
module.exports = (app,passport) => {
  app.get('/',isLoggedIn,(req,res)=>{
    res.render('dashboard')
  })
  app.get('/dashboard',isLoggedIn, (req,res)=>{    
    res.render('dashboard')
  })
};

