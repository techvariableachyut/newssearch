require('dotenv').config()
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config');
const { isLocal } = require('./utils/devEnvCheck.js');
const port  = process.env.PORT || 9001;
const app = express();
const { isLoggedIn } = require('./routes/middlewares/auth')
const DynamoDBStore = require('connect-dynamodb')({session: session});
const AWS = require('aws-sdk');

passport.use(new LocalStrategy(
  { 
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    const user = config.users[0] 
    if(email === user.email && password === user.password) {
      return done(null, user)
    }else{
      return false
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = config.users[0].id === id ? config.users[0] : false; 
  done(null, user);
});

console.log(process.env.NODE_ENV);

var AWSConfigJSON = null;
var client= null
if( isLocal ){
  client =new AWS.DynamoDB({ 
    endpoint: new AWS.Endpoint(config.aws_local_config.endpoint),
    region: config.aws_local_config.region
  })
}else{
  AWSConfig = {
    accessKeyId: config.aws_remote_config.accessKeyId,
    secretAccessKey: config.aws_remote_config.secretAccessKey,
    region: config.aws_remote_config.region
  }
}

var options = {
  table: config.aws_user_session_table_name,
  client,
  AWSConfigJSON,
  readCapacityUnits: 5,
  writeCapacityUnits: 5
};

app.use(express.static('public'))
app.use(session({
  store: new DynamoDBStore(options), 
  secret: 'dsdasda2q323hsdfsdf',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine','ejs');
// API routes
require('./routes/routes')(app,passport);
// Route not found
app.get('*', isLoggedIn,function(req, res){
  res.redirect('/')
});


app.listen(port);
module.exports = app;
