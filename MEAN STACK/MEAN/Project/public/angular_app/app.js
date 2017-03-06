angular.module('myHotelsApp', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider, $locationProvider){

	$locationProvider.hashPrefix('');//remove ! on url when submit on HTML5
	$httpProvider.interceptors.push('AuthInterceptor');// add AuthInterceptor into http request

	$routeProvider
		.when('/', {
			templateUrl: 'angular_app/main/main.html',
			access: {
				restricted: false
			}
		})
		.when('/hotels', {
			templateUrl: 'angular_app/hotel_list/hotels.html',
			controller: HotelListController,
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/hotel/:id', {
			templateUrl: 'angular_app/hotel_display/hotel_display.html',
			controller: HotelDisplayController,
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/register', {
			templateUrl: 'angular_app/register/register.html',
			controller: RegisterController,
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/profile', {
			templateUrl: 'angular_app/profile/profile.html',
			controllerAs: 'vm',
			access: {
				restricted: true
			}
		})
		.otherwise({
			redirectTo: '/'
		});
}

function run($rootScope, $location, $window, AuthFactory) {

	//Listen on root scope on event route change start
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
		if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn){
			event.preventDefault();
			$location.path('/');
		}
	})
}