console.log('1: Start app\n');

//This function will run after timeout 1000 ms
var holdOn = setTimeout(function(){
	console.log('2: In the setTimeout\n');
}, 1000);


console.log('3: End app\n');