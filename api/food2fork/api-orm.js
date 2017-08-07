var keys = require("../../keys");
var request = require("request");


//====Food2Fork.com====//
var f2fBaseURL = "http://food2fork.com/api/search?key=" + keys.food2fork_key;
var f2fORM = {
	convertBodyArray: function(body) {
		var newBody = body.map(f2fORM.convertRecipeObject);
		return newBody;
	},
	convertRecipeObject: function(recipe) {
		var newRecipeObject = {
			title: recipe.title,
			href: recipe.source_url,
			ingredients: [],
			thumbnail: recipe.image_url
		};
		return newRecipeObject;
	},
	highestRatedRecipes: function(callback) {
		request(f2fBaseURL, function(error, response, body) {
			callback(f2fORM.convertBodyArray(JSON.parse(body).recipes));
		});
	},
	// search needs to be formatted as an array
	userSearch: function(search, callback) {
		var finalURL = f2fBaseURL + "&q=" + search.join("+");
		console.log(finalURL);
		request(finalURL, function(error, response, body) {
			callback(f2fORM.convertBodyArray(JSON.parse(body).recipes));
		});
	}
};

// f2fORM.userSearch(["chicken", "fajitas"], console.log);
// f2fORM.highestRatedRecipes(console.log);

module.exports = f2fORM;
