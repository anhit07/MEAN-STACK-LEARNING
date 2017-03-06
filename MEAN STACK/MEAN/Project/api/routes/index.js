var express = require('express');
var ctrHotels = require('../controllers/hotels.controllers.js');
var ctrReviews = require('../controllers/reviews.controllers.js');
var ctrUsers = require('../controllers/users.controllers.js');
var router = express.Router();

router
	//Can change different methods to a single route
	.route('/hotels')
	//If method is get, run authenticate to verify user then run hotelsGetAll
	/*In case access to url "http://localhost:3000/api/hotels" without Authorization on Header
	  It will return status: 403 and 'No token provided'(in users.controllers.authenticate)

		In case access to url "http://localhost:3000/api/hotels" with the header includes:
			Authorization: Bearer + ' ' + token key
		It will return  req.user = decoded.username and call the next midleware function (ctrHotels.hotelsGetAll)
	*/
	.get(ctrUsers.authenticate, ctrHotels.hotelsGetAll)

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

//Users and Authentication
router
	.route('/users/register')
	.post(ctrUsers.register);

router
	.route('/users/login')
	.post(ctrUsers.login);

module.exports = router;