var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({
  path: '/iambition',
  secret: process.env.HUB_SECRET
})

http.createServer(function(req, res) {
  handler(req, res, function(err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(8283)

handler.on('error', function(err) {
  console.error('Error:', err.message)
})

handler.on('push', function(event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  var exec = require('child_process').exec;
  exec('bash iambition.sh', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    res.send('Done!');
    if (error !== null) {
      console.log('exec error: ', error);
    }
  });
})

handler.on('issues', function(event) {
  console.log('Received an issue event for % action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})
