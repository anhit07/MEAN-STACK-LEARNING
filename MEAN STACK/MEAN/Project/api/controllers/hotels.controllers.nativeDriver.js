var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//Get all url
module.exports.hotelsGetAll = function(req, res){

	var db = dbconn.get();
	var collection = db.collection("hotels");
	
	var offset = 0;
	var count = 5;

	if(req.query && req.query.offset){
		offset = parseInt(req.query.offset, 10);
	}

	if(req.query && req.query.count){
		count = parseInt(req.query.count, 10);
	}

	collection
	.find()
	.skip(offset)
	.limit(count)
	.toArray(function(err, docs){
		console.log('Hotel list', docs);
		res
			.status(200)
			.json(docs);
	});

	// var returnData = hotelData.slice(offset, offset + count);
	// res
	// 	.status(200)
	// 	//.json({"jsondata" : true});
	// 	.json(returnData);
};

//Get one with submitted hotel ID
module.exports.hotelsGetOne = function(req, res){

	var db = dbconn.get();
	var collection = db.collection("hotels");

	var hotelID = req.params.hotelID;
	//var thisHotel = hotelData[hotelID];

	console.log('GET the hotel: ' + hotelID);
	
	collection
		.findOne({
			_id : ObjectId(hotelID)
		},function(err, doc){
		res
			.status(200)
			.json(doc);
	});
	
};

//Add new one
module.exports.hotelsAddOne = function(req, res){
	var db = dbconn.get();
	var collection = db.collection("hotels");
	var newHotel;

	console.log('POST a new hotel');

	if(req.body && req.body.name && req.body.stars){
		
		newHotel = req.body;
		newHotel.stars = parseInt(req.body.stars,10);
		
		collection.insertOne(newHotel, function(err, response){
			console.log(response);
			console.log(response.ops);
		res
			.status(201)//created
			.json(response.ops);
		});

	} else{
		console.log("Data missing from body");
		res
			.status(400)
			.json({messeage : "Please input data"});	
	}
	
};	