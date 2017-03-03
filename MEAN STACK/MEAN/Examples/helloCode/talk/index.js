var filename = "index.js";

var hello = function(name){
	console.log("Hello " + name);
};

var intro = function(){
	console.log("This is " + filename + "\n");
};

//Export this module to be used outside
module.exports = {
	hello : hello,
	intro : intro
};
