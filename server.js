//
// This is where the app starts :)
//

var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
var dotenv = require('dotenv');

var appPort = 3000;
if (process.env.PORT) {
    appPort = process.env.PORT;
}


// CORS middleware function
var allowCrossDomain = function(req, res, next) {
    var headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    for (var key in headers) {
        res.set(key, headers[key]);
    }
    next();
}

dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.removeHeader("X-Powered-By");
    res.set('X-Powered-By', 'LiveChat-L2-Team');
    next();
});

app.use(allowCrossDomain);

var routes = require("./routes.js")(app, request);

var server = app.listen(appPort, () =>
    console.log(`Server running on http://localhost:${appPort}...`)
);