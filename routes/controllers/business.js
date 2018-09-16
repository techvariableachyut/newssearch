const AWS = require('aws-sdk');
const config = require('../../config/config.js');
const isDev = process.env.NODE_ENV !== 'production';
const { isLoggedIn } = require('../middlewares/auth.js');
const { docClient } = require( '../../db/');
const uuid = require('uuid/v4')
module.exports = (app) => {
  app.get('/business/',isLoggedIn,(req,res)=>{
    var params = {
        TableName: config.aws_business_table_name,
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
          console.log(data.Items);
          res.render('business/list',{data:data.Items})
        }
    });

  })

  app.get('/business/create/',isLoggedIn,(req,res)=>{
      res.render('business/create')
  })

  app.post('/business/create/',isLoggedIn,(req,res) => {
    const { 
      businessName, industryName,
      baddress,badmin,badminemail,
      socialMedia,bdesc
    } = req.body
    const businessId = uuid();
    const params = {
      TableName: config.aws_business_table_name,
      Item: {
        id: businessId,
        businessname: businessName,
        industryName: industryName || null,
        address: baddress || null,
        businessAdminName: badmin || null,
        businessAdminEmail: badminemail,
        businessDesc: bdesc || null,
        socialMedia: JSON.parse(socialMedia)
      }
    };

    docClient.put(params, function(err, data) {
      if (err) {
        console.log(err);
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        const { Items } = data;
        res.json({
          done: true,
          data: data,
          error: false
        })
      }
    });

  })

  app.get('/business/:bid',isLoggedIn,(req,res)=>{
      const bid = req.params.bid
      // req.query.id;
      const params = {
        TableName: config.aws_business_table_name,
        KeyConditionExpression: 'id = :i',
        ExpressionAttributeValues: {
          ':i': bid
        }
      };
      docClient.query(params, function(err, data) {
        if (err) {
          res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else {
          const { Items } = data;
          console.log(Items);
          console.log()
          res.render('business/details',{Items:Items[0]})

        }
      });
  })


  app.get('/business/update/:bid',isLoggedIn,(req,res)=>{
      const bid = req.params.bid
      // req.query.id;
      const params = {
        TableName: config.aws_business_table_name,
        KeyConditionExpression: 'id = :i',
        ExpressionAttributeValues: {
          ':i': bid
        }
      };
      docClient.query(params, function(err, data) {
        if (err) {
          res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else {
          const { Items } = data;
          console.log(Items);
          console.log()
          res.render('business/update_details',{Items:Items[0]})

        }
      });
  })

  app.post('/business/update/:bid',isLoggedIn,(req,res)=>{
      const bid = req.params.bid
      // req.query.id;
      // const params = {
      //   TableName: config.aws_business_table_name,
      //   KeyConditionExpression: 'id = :i',
      //   ExpressionAttributeValues: {
      //     ':i': bid
      //   }
      // };
      res.redirect('/')
  })

};
