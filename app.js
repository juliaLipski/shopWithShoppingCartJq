var express = require('express')
var app = express();
var path    = require("path");
var router = express.Router();
var dt = require('./public/data/shop.json')
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('index.html');
});

app.get('/dt/', function(req, res) {
  res.json(dt)
});


app.listen(8880);

