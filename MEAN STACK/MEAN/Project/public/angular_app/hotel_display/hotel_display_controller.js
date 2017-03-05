angular.module('myHotelsApp')
		.controller('HotelDisplayController', HotelDisplayController);

function HotelDisplayController($route, $routeParams, HoteDataFactory) {
	var vm = this;
	var id = $routeParams.id

	HoteDataFactory.hotelDisplay(id).then(function(response){
		vm.hotel = response.data;
		vm.stars = _getStartRating(response.data.stars);
	});
	function _getStartRating(stars) {
		return new Array(stars);
	}

	vm.addReview = function() {
		
		var postData = {
			name: vm.name,
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
    }
}

