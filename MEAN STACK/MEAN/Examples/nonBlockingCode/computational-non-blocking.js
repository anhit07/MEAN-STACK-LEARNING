//Get current working folder
var fs = require('fs'),
	path = require('path');
var dirString = path.dirname(fs.realpathSync(__filename));

//Import the native node module "child_process"
var child_process = require('child_process');
var fileName = dirString + '/_fibonacci.js';

console.log("1");
//Create child process(run the function in fileName) which does not block the main flow
var newProcess = child_process.spawn("node", [fileName], {
	stdio: 'inherit'
});

console.log("2");