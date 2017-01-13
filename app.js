var express = require('express');
var app = express();

app.get(['/', '/index.html'], function (req, res) {
  res.send('Hello ELB applied healthcheck'); 
});


app.get(['/healthcheck.html']), function (req, res) {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': 2
  });
  response.write('OK');
  response.end();
}

app.listen(3000);