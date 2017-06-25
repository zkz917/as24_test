var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var cors        =   require('cors')
var routes      =   require('./routes/advertroute');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({"extended" : false}));

app.use('/',routes);

app.listen(3000);
console.log("Listening to PORT 3000");