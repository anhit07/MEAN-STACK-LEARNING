angular.module('myHotelsApp').controller('HotelListController', HotelListController);

function HotelListController(HoteDataFactory) {
	var vm = this;
	vm.title = "MEAN Hotels App";

	HoteDataFactory.hotelList().then(function(response){
		vm.hotels = response.data;
	});

}

