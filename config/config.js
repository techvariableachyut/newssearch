module.exports = {
  aws_user_table_name: 'usersTable',
  aws_user_session_table_name: 'userSessionsTable',
  aws_social_media_table_name: 'socialMediaTable',
  aws_keywords_table_name: 'keywordsTable',
  aws_business_table_name: 'businessTable',
  aws_local_config: {
    region: 'local',
    endpoint: 'http://localhost:8000'
  },
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  },
  users: [
    {
      id: '2f24vvg', 
      email: 'admin', 
      password: 'admin'
    }
  ]
};