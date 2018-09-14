const exec = require('child_process').exec;
const fs = require('fs')


fs.readdirSync(__dirname + '/../config/tables/').forEach((file) => {
	console.log(file);
  const testscript = exec(`aws dynamodb create-table --cli-input-json file://${__dirname}/../config/tables/${file} --endpoint-url http://localhost:8000`);
  testscript.stdout.on('data', function(data){
      console.log(data); 
  });

  testscript.stderr.on('data', function(data){
      console.log(data);
      // triggerErrorStuff(); 
  });

});

