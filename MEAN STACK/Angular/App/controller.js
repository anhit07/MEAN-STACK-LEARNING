//Module Getter and add controller and callbach function
angular.module('myApp')
		.controller('MyController', MyController)
		.controller('AboutController', AboutController)

function MyController(){
	var vm = this;
	vm.name = "controllerName";
}

function AboutController(){
	var vm = this;
	vm.about = "aboutControllerName";
}