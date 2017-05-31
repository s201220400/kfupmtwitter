var express = require('express');
var bodyParser = require('body-parser')
var twitterApp = require('./twitter-kfupm')

var app = express();

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, response){
    response.render('index');
});

app.get('/scripts/*', function(req, response){
    response.sendFile(__dirname + req["originalUrl"]);
});

app.get('/images/*', function(req, response){
    response.sendFile(__dirname + req["originalUrl"]);
});

app.post('/get_tweets', function(request, response){
    var tweets = twitterApp(response, Number(request.body.counter));
});

var server = app.listen(8080, function(){
    console.log("Listening on port 8080");
});