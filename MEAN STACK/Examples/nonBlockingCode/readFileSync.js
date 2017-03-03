//Impport the module Node file system
//Every method in the fs module has synchronous as well as asynchronous forms
var fs = require('fs');

console.log("Start getting a file\n");
var file = fs.readFileSync("node_modules/Examples/nonBlockingCode/readFileSync.js");
console.log("Got the file\n");

console.log("App continues");