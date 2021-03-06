var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8956;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

['GET', 'POST', 'PUT', 'DELETE'].forEach(function (method) {
  app[method.toLowerCase()]('*', function (req, res) {
    res.json({
      method: method,
      url: req.url,
      body: req.body
    }).end();
  });
});

app.listen(port, function () {
  console.info('Mock server running at http://localhost:' + port);
});