const fs = require('fs');
const path = require('path');
module.exports = (app,passport) => {
  fs.readdirSync(__dirname + '/controllers/').forEach((file) => {
    require(`./controllers/${file.substr(0, file.indexOf('.'))}`)(app,passport);
  });
};


