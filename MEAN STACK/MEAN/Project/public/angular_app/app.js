angular.module('myHotelsApp', ['ngRoute']).config(config);

function config($routeProvider, $locationProvider){

	$locationProvider.hashPrefix('');//remove ! on url when submit on HTML5
	$routeProvider
		.when('/', {
			templateUrl: 'angular_app/hotel_list/hotels.html',
			controller: HotelListController,
			controllerAs: 'vm'
		})
		.when('/hotel/:id', {
			templateUrl: 'angular_app/hotel_display/hotel_display.html',
			controller: HotelDisplayController,
			controllerAs: 'vm'
		});
}
