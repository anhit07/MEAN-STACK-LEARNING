angular.module('myHotelsApp').directive('mhNavigation', mhNavigation);

function mhNavigation(){
	return {
		restrict: 'E',
		templateUrl: 'angular_app/navigation-directive/navigation-directive.html'
	};
}