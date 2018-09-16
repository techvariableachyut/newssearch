const config = require('../config/config.js');
const AWS = require('aws-sdk');
const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
  AWS.config.update(config.aws_local_config);
} else {
  AWS.config.update(config.aws_remote_config);
}
exports.ddb = new AWS.DynamoDB();
exports.docClient = new AWS.DynamoDB.DocumentClient();
