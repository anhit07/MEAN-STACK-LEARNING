var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel'
//Hold the connection
var _connection = null;

//Set connection
var open = function(){
	MongoClient.connect(dburl, function(err, db){
		if(err){
			console.log('DB connection fails');
			return;
		}
		_connection = db;
		console.log('DB connection open', db);
	});
};

//Get connection
var get = function(){
	return _connection;
};

module.exports = {
	open : open,
	get : get
};