var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel'

mongoose.connect(dburl);

//Listen to the connection event
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ', dburl);
});

//Listen to the disconnection event
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected to ', dburl);
});

//Listen to the error event
mongoose.connection.on('error', function(err){
	console.log('Mongoose error', err);
});

//Listen to the app termination event --CTRl C
process.on('SIGINT', function(){
	//Close the Mongoose connection
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

process.on('SIGTERM', function(){
	//Close the Mongoose connection
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through SIGTERM');
		process.exit(0);
	});
});

//nodemon sends a SIGUSR2 signal on terminate that Windows doesn't handle
process.once('SIGUSR2', function(){
	//Close the Mongoose connection
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through SIGUSR2');
		process.kill(process.pid, 'SIGUSR2');
	});
});

//Bring in SCHEMAS AND MODELS
require('./hotels.model.js');