require('./instanceHello');
//Assign exported functions from modules in links of require method
var goodbye = require('./talk/goodbye');
var talk = require('./talk');//Default: will find the talk.js then index.js
var question = require('./talk/question');


//Call exported functions
talk.intro();

//with parameter
talk.hello("LAnh");

//with return a string
var answer = question.ask("What is it?");
console.log(answer);
goodbye();

