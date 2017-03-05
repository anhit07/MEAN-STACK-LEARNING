var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
	username : {
		type : String,
		unique: true,
		require : true
	},
	name : {
		type : String,
	},
	password : {
		type : String,
		unique: true
	},
});

mongoose.model("User", hotelSchema);