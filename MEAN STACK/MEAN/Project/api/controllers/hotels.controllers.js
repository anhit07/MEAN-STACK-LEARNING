//var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
//Geo based query

	var lng = pasrseFloat(req.query.lng);
	var lat = pasrseFloat(req.query.lat);

	//Build geoJSON point for mongoDb calculates actual point on sphere
	var point = {
		type : "Point",
		coordinates : [lng, lat]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 2000,//Distance between hotels in meters
		num : 5//max return rows
	};

	Hotel
		.geoNear(point, geoOptions, function(err, results, stats){
			console.log('Geo results', results);
			console.log('Geo stats', stats);
			res
				.status(200)
				.json(results);
		});
}

//Get all url
module.exports.hotelsGetAll = function(req, res){

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if(req.query && req.query.lat && req.query.lng){
		runGeoQuery(req, res);
		return;
	}

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	//Validate for the query parameters
	if(isNaN(offset) || isNaN(count)){
		res
			.status(400)
			.json({
				"messeage" : "Invalid query parameter"
			});
		return;
	}

	if(count > maxCount){
		res
			.status(400)
			.json({
				"messeage" : "Bad request"
			});
		return;
	}

	Hotel
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err, hotels){
			if(err){
				console.log("Error finding");
				res
					.status(500)
					.json(err);
			} else {
				console.log("Found hotels", hotels.length)
				res
					.json(hotels);
			}
		});
};

//Get one with submitted hotel ID
module.exports.hotelGetOne = function(req, res){

	var id = req.params.hotelID;
	console.log('GET the hotel: ' + id);
	
	Hotel
		.findById(id)
		.exec(function(err, doc){

			var response = {
				status : 200,
				messeage : doc
			};

			if (err) {
				console.log("Error finding");
				response.status = 500;
				response.messeage = err;
			} else if(!doc){//if no hotel found
				response.status = 404;
				response.messeage = {"messeage" :  "Hotel not Found"};
				
			}

			res
				.status(response.status)
				.json(response.messeage);
		});
};

var _splitArray = function(input) {
	var output;
	if(input && input.length > 0){
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
}
//Add new one
module.exports.hotelsAddOne = function(req, res){
	Hotel
		.create({
			name: req.body.name,
			description: req.body.description,
			stars: parseInt(req.body.stars, 10),

			services: _splitArray(req.body.services),
			photos: _splitArray(req.body.photos),
			currency: req.body.currency,

			location : {
				address: req.body.address,
				coordinates : [
					parseFloat(req.body.lng),
					parseFloat(req.body.lat)
				]
			}

		}, function(err, hotel){
			if(err) {
				console.log("Error creating hotel");
				res
					.status(400)
					.json(err);
			} else {
				console.log("Hotel created", hotel);
				res
					.status(201)//created
					.json(hotel);
			}
		});
};	

module.exports.hotelUpdateOne = function(req, res){
	var id = req.params.hotelID;
	console.log('GET the hotel: ' + id);
	
	Hotel
		.findById(id)
		.select('-reviews -rooms')//exclude reviews and rooms arrays
		.exec(function(err, doc){
			var response = {
				status : 200,
				messeage : doc
			};
			if (err) {
				console.log("Error finding");
				response.status = 500;
				response.messeage = err;
			} else if(!doc){//if no hotel found
				response.status = 404;
				response.messeage = {"messeage" :  "Hotel not Found"};	
			}
			if(response.status != 200) {
				res
					.status(response.status)
					.json(response.messeage);
			} else {
				doc.name = req.body.name;
				doc.description = req.body.description;
				doc.stars = parseInt(req.body.stars, 10);

				doc.services = _splitArray(req.body.services);
				doc.photos = _splitArray(req.body.photos);
				doc.currency = req.body.currency;

				doc.location = {
					address : req.body.address,
					coordinates : [
						parseFloat(req.body.lng),
						parseFloat(req.body.lat)
					]
				};
				doc.save(function(err, hotelUpdated){
					if(err) {
						res
							.status(500)
							.json(err);
					} else {
						res
							.status(204)//empty res
							.json();
					}
				});
			}
		});
};


module.exports.hotelDeleteOne = function(req, res){
	var hotelID = req.params.hotelID;
	console.log('Delete the hotel: ' + hotelID);
	
	Hotel
		.findByIdAndRemove(hotelID)
		.exec(function(err, hotel){
			
			if(err) {
				res
					.status(404)
					.json(err);
			} else if(!hotel){
				res
					.status(404)
					.json({"messeage" : "Hotel not found"});
			} else {
				console.log('Hotel deleted ' + hotelID);
				res
					.status(204)
					.json();
			}
		});
};