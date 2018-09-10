const exec = require('child_process').exec, child;
const testscript = exec('sh myscript.sh /directory');

testscript.stdout.on('data', function(data){
    console.log(data); 
});

testscript.stderr.on('data', function(data){
    console.log(data);
    // triggerErrorStuff(); 
});

fs.readdirSync(__dirname + '../config/tables/').forEach((file) => {
  require(`./controllers/${file.substr(0, file.indexOf('.'))}`)(app,passport);
});

