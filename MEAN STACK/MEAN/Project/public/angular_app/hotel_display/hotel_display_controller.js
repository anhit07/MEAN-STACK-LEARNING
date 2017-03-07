angular.module('myHotelsApp').controller('HotelDisplayController', HotelDisplayController);

function HotelDisplayController($route, $routeParams, $window, HoteDataFactory, AuthFactory, jwtHelper) {
	var vm = this;
	var id = $routeParams.id;

	HoteDataFactory.hotelDisplay(id).then(function(response){
		vm.hotel = response.data;
		vm.stars = _getStartRating(response.data.stars);
	});

	function _getStartRating(stars) {
		return new Array(stars);
	}

	vm.isLoggedIn = function(){
		if(AuthFactory.isLoggedIn){
			return true;
		} else {
			return false;
		}
	};

	vm.addReview = function() {
		
		var token = jwtHelper.decodeToken($window.sessionStorage.token);
		var username = token.username;

		var postData = {
			name: username,
			rating:vm.rating,
			review: vm.review
		};
    	
    	if(vm.reviewForm.$valid){

    		HoteDataFactory.postReview(id, postData).then(function(response){
    			if(response.status == 201){
    				$route.reload();
    			}
    		}).catch(function(error){
    			console.log(error);
    		});
    	} else {
    		vm.isSubmitted = true;
    	}
    };
}

