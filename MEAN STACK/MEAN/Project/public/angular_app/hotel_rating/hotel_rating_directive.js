/*Custom Directive*/
/*angular.module('myHotelsApp').directive('hotelRating', hotelRating);// will become <hotel-rating> in html

function hotelRating() {
	return {

		//Restrict driective will become elemetn or attribute
		restrict: 'E',//E: element, A: attribute, C: class name,M: comment
		template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
		//Bind the attribute star to the return value of HotelListController
		bindToController: true,
		controller: 'HotelDisplayController',
		controllerAs: 'vm',
		scope: {
			stars: '@'// '='for value, '@'for object, '&'' for function
		}
	};
}*/

angular.module('myHotelsApp').component('hotelRating', {

	binding: {
		stars: '='
	},
	template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
	controller: 'HotelDisplayController',
	controllerAs: 'vm'
});
