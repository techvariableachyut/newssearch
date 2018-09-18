const AWS = require('aws-sdk');
const config = require('../../config/config.js');
const { isLoggedIn } = require('../middlewares/auth.js');
const { docClient } = require( '../../db/');
const uuid = require('uuid/v4')
module.exports = (app) => {
  app.get('/business/',isLoggedIn,(req,res)=>{
    var params = {
        TableName: config.aws_business_table_name,
    };
    docClient.scan(params, function(err, data) {

       try {
          res.render('business/list',{data:data.Items})
       } catch (error) {
          res.send('something went wrong')        
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
          // console.log(Items)
          console.log(Items[0].socialMedia[1]);
          
          for(mem in Items[0].socialMedia[1])
          {
            if(Items[0].socialMedia[1].mem == null)
            {
              console.log('done')
            }
            else {
              console.log('not done')
            }
          }

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

      console.log(req.body.socialMedia)

      // var params = {
      // TableName: config.aws_business_table_name,
      // Key:{
      //     "id": ":bid"
      // },
      // UpdateExpression: "set socialMedia = :s",
      // ExpressionAttributeValues:{
      //     ":bid": bid,
      //     ":s": JSON.parse(req.body.socialMedia)
      // },
      // ReturnValues:"UPDATED_NEW"
      // };

      
      // docClient.update(params, function(err, data) {
      //     if (err) {
      //         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      //     } else {
      //         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      //     }
      // });

      var params = {
    TableName: 'local_businessTable',
    Key: { 
      
    },
    KeyConditionExpression: 'id = :i',
    UpdateExpression: 'SET address = :a1, industryName = :name, myname = :mn, socialMedia = :sm',
    ExpressionAttributeValues: { 
        ':i':  bid,
        ':a1': 'nilu',
        ':name': 'nilu',
        ':mn': 'Nilutpal',
        ':sm': JSON.parse(req.body.socialMedia)
    }
};
docClient.update(params, function(err, data) {
          if (err) {
              console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          }
      });

      res.redirect('/')
  })

};
