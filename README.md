# News Search APP

## For Local development 

-> Install dynamodb local   
-> Run dynamodb (By dealut it runs on port 8000)  
-> Create a .env file inside project root directory and put      
```
NODE_ENV=local  
AWS_ACCESS_KEY_ID=  
AWS_SECRET_ACCESS_KEY=  
AWS_REGION=  
PORT=3000  
```  
-> Inside project root directory  `npm install`  
-> For Create tables `npm run db:migrate`  
-> And finally `npm run start:dev`


## Deploying in aws ec2 development instance  
-> pull request to `developmet` branch 

## Deploying in aws ec2 prod instance  
-> pull request to `master` branch 








