var express = require('express');
var app = express();

var snaply = function(req, res) {
  var exec = require('child_process').exec;
  exec('bash snaply.sh', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    res.send('Done!');
    if (error !== null) {
      console.log('exec error: ', error);
    }
  });
}

app.get('/snaply', snaply);

app.listen(8282, function() {
  console.log('GitHub auto-deploy service is running...');
})
