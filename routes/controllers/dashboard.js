const AWS = require('aws-sdk');
const config = require('../../config/config');
const isDev = process.env.NODE_ENV !== 'production';
const { isLoggedIn } = require('../middlewares/auth')
module.exports = (app,passport) => {
  app.get('/',isLoggedIn,(req,res)=>{
    res.render('dashboard')
  })
  app.get('/dashboard',isLoggedIn, (req,res)=>{    
    res.render('dashboard')
  })
};

