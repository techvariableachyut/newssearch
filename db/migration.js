const exec = require('child_process').exec;
const fs = require('fs')
fs.readdirSync(__dirname + '/models/').forEach((file) => {
  let script = __dirname + '/models/'+file;
  const exescript = exec(`node ${script} `);
  exescript.stdout.on('data', function(data){
      console.log(data); 
  });
  exescript.stderr.on('data', function(data){
      console.log(data);
  });
});

