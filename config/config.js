require('dotenv').config()
module.exports = {
  aws_user_table_name: process.env.NODE_ENV+'_usersTable',
  aws_user_session_table_name: process.env.NODE_ENV+'_userSessionsTable',
  aws_social_media_table_name: process.env.NODE_ENV+'_socialMediaTable',
  aws_keywords_table_name: process.env.NODE_ENV+'_keywordsTable',
  aws_business_table_name: process.env.NODE_ENV+'_businessTable',
  aws_local_config: {
    region: process.env.NODE_ENV,
    endpoint: 'http://localhost:8000'
  },
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || ''
  },
  users: [
    {
      id: '2f24vvg', 
      email: 'admin', 
      password: 'admin'
    }
  ]
};