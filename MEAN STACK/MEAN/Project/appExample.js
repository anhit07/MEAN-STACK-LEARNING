var express = require ('express');
var app = express ();
var routes = require('./routes');
var	path = require('path');


var filePath = path.join(__dirname, 'app.js');
//html path: seperate parameter for folder and file name 
//				to avoid the syntax issues of directory structure in different OS
//var htmlPath = path.join(__dirname, 'public', 'index.html');
var staticPath = path.join(__dirname, 'public');

//Set listening port for server
app.set('port', 3000);


//Call the function when running the mildware for any accessed files
app.use(function(req, res, next){
	console.log(req.method ,  req.url);
	next();
});

//Call the function when running the mildware for all accessed files in one folder(css)
/*app.use('/css',function(req, res, next){
	console.log(req.method ,  req.url);
	next();
});*/

//Using the static root path for responding
//app.use('/public', express.static(staticPath));//subset with public folder
app.use(express.static(staticPath));
app.use('/api',routes);

//Define the route -  the http method with 
//2 parameters request and response
/*app.get('/', function(req, res){
	console.log('GET the homepage');
	res
		.status(200)
		//.send("Express yourself");//will be print on web browser
		.sendFile(htmlPath);
});*/

//Response with JSON
/*app.get('/json', function(req, res){
	console.log('GET the json');

	res
		.status(200)
		.json({"jsondata" : true});
});


//Response a File
app.get('/file', function(req, res){
	console.log('GET the file');
	res
		.status(200)
		.sendFile(filePath);//path.join(_dirname, 'app.js')
});*/



//Listen at port 3000: asynchronous method return the object of server with application variables
var server = app.listen(app.get('port'), function(){
	var port = server.address().port
	console.log('Something comming on port ' + port);
});
console.log('Me first');

