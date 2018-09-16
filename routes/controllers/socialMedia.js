const AWS = require('aws-sdk');
const config = require('../../config/config.js');
const isDev = process.env.NODE_ENV !== 'production';
const { isLoggedIn } = require('../middlewares/auth.js');
const { docClient } = require( '../../db/');
const uuid = require('uuid/v4')
module.exports = (app) => {

  app.get('/social-media/app/create',isLoggedIn,(req,res)=>{
      res.render('socialmedia/add')
  })

  app.post('/social-media/app/create',isLoggedIn,(req,res)=>{

    const { 
      app,
      appname,
      appdesc,
      configs,
      searchOn
    } = req.body
    const Id = uuid();
    const params = {
      TableName: config.aws_social_media_table_name,
      Item: {
        id: Id,
        site: app,
        appname: appname || 'app-'+uuid(),
        appdesc: appdesc,
        configs: JSON.parse(configs),
        searchOn:  JSON.parse(searchOn)
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
          data,
          done: true,
          error: false
        })
      }
    });
  })

  app.get('/social-media/app/',isLoggedIn,(req,res)=>{
    var params = {
        TableName: config.aws_social_media_table_name,
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
          res.render('socialmedia/list',{data:data.Items})
        }
    });

  })

  app.get('/social-media/filter/site/:channal',isLoggedIn,(req,res)=>{
    const site = req.params.channal
    var params = {
        TableName: config.aws_social_media_table_name,
        ExpressionAttributeNames: {
            "#site": "site",
        },
        ExpressionAttributeValues: {
            ":site": site,
        },
        FilterExpression: "#site = :site" 
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
          res.json(data.Items)
        }
    });

  })



  app.get('/social-media/filter/app/:id',isLoggedIn,(req,res)=>{
    const id = req.params.id
    var params = {
      TableName: config.aws_social_media_table_name,
      ExpressionAttributeNames: {
          "#id": "id",
      },
      ExpressionAttributeValues: {
          ":id": id,
      },
      FilterExpression: "#id = :id" 
  };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
          res.json(data.Items)
        }
    });

  })


  app.get('/social-media/app/:appId',isLoggedIn,function(req,res){

    const appId = req.params.appId

      const params = {
        TableName: config.aws_social_media_table_name,
        KeyConditionExpression: 'id = :i',
        ExpressionAttributeValues: {
          ':i': appId
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
          res.render('socialmedia/view_details',{Items:Items[0]})
        }

  });

})

  app.get('/social-media/app/update/:appId',isLoggedIn,function(req,res){

    const appId = req.params.appId

      const params = {
        TableName: config.aws_social_media_table_name,
        KeyConditionExpression: 'id = :i',
        ExpressionAttributeValues: {
          ':i': appId
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
          res.render('socialmedia/update_config',{Items:Items[0]})
        }

  });

})

}
