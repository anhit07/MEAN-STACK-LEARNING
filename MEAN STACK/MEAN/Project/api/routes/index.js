var express = require('express');
var ctrHotels = require('../controllers/hotels.controllers.js');
var ctrReviews = require('../controllers/reviews.controllers.js');
var router = express.Router();

router
	.route('/hotels')

	//Can change different methods to a single route
	.get(ctrHotels.hotelsGetAll)//if method is get, run hotelsGetAll
	.post(ctrHotels.hotelsAddOne);//if method is post, run hotelsAddOne

	/*//POST
	.post(function(req, res){
		console.log('Post the json');
		res
			.status(200)
			.json({"jsondata" : "Post route"});
	});*/

router
	.route('/hotels/:hotelID')
	.get(ctrHotels.hotelGetOne)
	.put(ctrHotels.hotelUpdateOne)
	.delete(ctrHotels.hotelDeleteOne);

/*router
	.route('/hotels/new')
	.post(ctrHotels.hotelsAddOne);*/

//Reviews
router
	.route('/hotels/:hotelID/reviews')
	.get(ctrReviews.reviewsGetAll)
	.post(ctrReviews.reviewAddOne);

router
	.route('/hotels/:hotelID/reviews/:reviewID')
	.get(ctrReviews.reviewGetOne)
	.put(ctrReviews.reviewUpdateOne)
	.delete(ctrReviews.reviewDeleteOne);

module.exports = router;