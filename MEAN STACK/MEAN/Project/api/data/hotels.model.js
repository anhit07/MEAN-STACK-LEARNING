var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
	name : {
		type : String,
		require : true
	},
	rating : {
		type : Number,
		min : 0,
		max : 5,
		require : true
	},
	review : {
		type : String,
		require : true
	},

	createdOn : {
		type : Date,
		"default" : Date.now
	}
});

var roomSchema = new mongoose.Schema({
	type : String,
	number : Number,
	description : String,
	photos : [String],
	price : Number
});

//Schema: pass into Mongo schema as javascript object
var hotelSchema = new mongoose.Schema({
	//object key of name as a field- type is String-schema type
	name : {//An Object
		type : String,
		require : true//must not be null
	},
	stars : {
		type : Number,
		min : 0,// validation for allowed min number
		max : 5,
		"default" : 0
	},
	services : [String],//array of String
	description : String,
	photos : [String],
	currency : String,
	reviews : [reviewSchema],//reference array to reviewSchema
	rooms : [roomSchema],
	location : {
		address : String,
		coordinates : {//Always strore longiture (E/W), latitude(N/S)
			type : [Number],
			index : '2dphere'
		}
	}
});


//Create model - compiled version of schema for app using
//Instance of the model has direct 1-1 relationship with a single document in db
//model(ModelName, PassedSchema, MongoCollectionName(optional))
//mongoose.model("Hotel", hotelSchema, 'hotels')
mongoose.model("Hotel", hotelSchema);