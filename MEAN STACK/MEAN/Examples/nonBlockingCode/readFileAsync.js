//Impport the module Node file system
//Every method in the fs module has synchronous as well as asynchronous forms
var fs = require('fs');
var filename = "node_modules/Examples/nonBlockingCode/readFileSync.js";

var onFileLoad = function(err,file){
	console.log("Got the file\n");
};

console.log("Start getting a file\n");

//Read file asynchronously, it does not interrupt the the flow of main process
fs.readFile(filename, onFileLoad);

console.log("App continues\n");