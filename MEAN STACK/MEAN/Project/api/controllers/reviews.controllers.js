var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//Get all url
module.exports.reviewsGetAll = function(req, res){
	var hotelID = req.params.hotelID;
	console.log('GET the reviews: ' + hotelID);
	
	Hotel
		.findById(hotelID)
		.select("reviews")
		.exec(function(err, doc){
			res
				.status(200)
				.json(doc.reviews);
		});
};

//Get one with submitted hotel ID
module.exports.reviewGetOne = function(req, res){

	var hotelID = req.params.hotelID;
	var reviewID = req.params.reviewID;
	console.log('GET the review: ', reviewID + "_" + hotelID);
	
	Hotel
		.findById(hotelID)
		.select("reviews")
		.exec(function(err, hotel){
			var review = hotel.reviews.id(reviewID);
			res
				.status(200)
				.json(review);
		});
};

var _addReview = function(req, res, hotel){
	hotel.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});

	hotel.save(function(err, hotelUpdated){
		if(err){
			res
				.status(500)
				.json(err);
		} else {
			res
				.status(201)
				//New review: return the last in the array of reviews
				.json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
		}
	});
}

//Add new one
module.exports.reviewAddOne = function(req, res){
	var hotelID = req.params.hotelID;
	console.log('Create the review: ', hotelID);
	
	Hotel
		.findById(hotelID)
		.select("reviews")
		.exec(function(err, doc){
			var response = {
				status : 200,
				messeage : []
			};

			if (err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.messeage = err;

			} else if(!doc){
				response.status = 404;
				response.messeage = {"messeage" :  "Hotel not Found" + hotelID};
			}

			if(doc) {
				 console.log("doc.reviews");
				_addReview(req, res, doc);
			} else {
				res
					.status(response.status)
					.json(response.messeage);
			}
		});
};


module.exports.reviewUpdateOne = function(req, res){
	 var hotelId = req.params.hotelID;
  var reviewId = req.params.reviewID;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.reviewDeleteOne = function(req, res){
	
	var hotelId = req.params.hotelID;
  	var reviewId = req.params.reviewID;
  	console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  	Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
      	hotel.reviews.id(reviewId).remove()

        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};