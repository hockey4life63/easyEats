var keys = require("../../keys");
var request = require("request");

//====Food2Fork.com====//
var f2fBaseURL = "http://food2fork.com/api/search?key=" + keys.food2fork_key;
var f2fORM = {
	highestRatedRecipes: function(cb) {
		request(f2fBaseURL, function(error, response, body) {
			cb(JSON.parse(body));
		});
	},
	userSearch: function(search, cb) {
		request(f2fBaseURL + "&q=" + search, function(error, response, body) {
			for(var i = 0; i < JSON.parse(body).recipes.length; i++) {
				cb(JSON.parse(body).recipes[i].publisher);
				cb(JSON.parse(body).recipes[i].f2f_url);
				cb(JSON.parse(body).recipes[i].title);
				cb(JSON.parse(body).recipes[i].source_url);
				cb(JSON.parse(body).recipes[i].recipe_id);
				cb(JSON.parse(body).recipes[i].image_url);
			}
		});
	}
};

f2fORM.userSearch("chicken", console.log);

