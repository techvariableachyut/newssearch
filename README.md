# News Search App

## For Local Development 

-> Install dynamodb local   
-> Run dynamodb (By dealut it runs on port 8000)  
-> Create a .env file inside project root directory and put      
```
NODE_ENV=local 
AWS_REGION=  
PORT=3000  //what ever port you like
```  
-> Inside project root directory  `npm install`  
-> For Create tables `npm run db:migrate`  
-> And finally `npm run start:local`


## Deploying in aws ec2 development instance  
-> pull request to `developmet` branch 

## Deploying in aws ec2 prod instance  
-> pull request to `master` branch  

## Production server url   
-> prod server  [prod](ec2-54-169-145-222.ap-southeast-1.compute.amazonaws.com)

## Development server url
-> dev server [dev](ec2-54-169-33-195.ap-southeast-1.compute.amazonaws.com)








