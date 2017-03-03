//require('./api/data/dbconnection.js').open();//using native driver
require('./api/data/db.js');//using mongoose

var express = require ('express');
var app = express();
var	path = require('path');
//body-parser: A node.js middleware for handling JSON, Raw, Text and URL encoded form data.
var bodyParser = require('body-parser');

var routes = require('./api/routes');

var filePath = path.join(__dirname, 'app.js');
var staticPath = path.join(__dirname, 'public');

//Set listening port for server
app.set('port', 3000);

//Call the function when running the mildware for any accessed files
app.use(function(req, res, next){
	console.log(req.method ,  req.url);
	next();
});

//Using the static root path for responding
//app.use('/public', express.static(staticPath));//subset with public folder
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({ extended : false }));

app.use('/api',routes);


//Listen at port 3000: asynchronous method return the object of server with application variables
var server = app.listen(app.get('port'), function(){
	var port = server.address().port
	console.log('Something comming on port ' + port);
});
