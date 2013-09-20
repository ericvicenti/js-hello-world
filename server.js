var express = require('express');
var app = express();

var level = require('level');
var db = level('./database');

app.use(express.bodyParser());

app.get(/^\/api(.*)$/, function(req, res) {
  var route = req.params[0];
  db.get(route, function(err, value) {
    if(err) res.send(404);
    else res.send(value);
  });
});

app.post(/^\/api(.*)$/, function(req, res) {
  var route = req.params[0];
  var data = JSON.stringify(req.body);
  db.put(route, data, function(err) {
    if(err) res.send(500);
    else res.send(200);
  });
});

app.del(/^\/api(.*)$/, function(req, res) {
  var route = req.params[0];
  db.del(route, function(err) {
    if(err) res.send(500);
    else res.send(200);
  });
});

app.use(express.static(__dirname + '/public'));

var port = 8888;

app.listen(port, function(err){

  if(err) return console.log('Oh noes!');

  console.log('App started on http://localhost:' + port);

});