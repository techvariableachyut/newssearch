const AWS = require('aws-sdk');
const config = require('../../config/config');
const { isLoggedIn } = require('../middlewares/auth')
const { docClient } = require( '../../db/');
module.exports = (app,passport) => {
  app.get('/',isLoggedIn,(req,res)=>{

  	var params = {
        TableName: config.aws_business_table_name,
    };
    docClient.scan(params, function(err, data) {

       try {
       	console.log(data.Items);
          res.render('dashboard',{data:data.Items})
       } catch (error) {
          res.send('something went wrong')        
       }

    });
  })

  app.get('/dashboard',isLoggedIn, (req,res)=>{    
    res.render('dashboard')
  })
};

