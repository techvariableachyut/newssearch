const config = require('../config/config.js');
const AWS = require('aws-sdk');
const { isLocal } = require('../utils/devEnvCheck.js');
if ( isLocal ) {
  AWS.config.update(config.aws_local_config);
} else {
  AWS.config.update(config.aws_remote_config);
}
exports.ddb = new AWS.DynamoDB();
exports.docClient = new AWS.DynamoDB.DocumentClient();
