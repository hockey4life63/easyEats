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
	highestRatedRecipes: function(cb) {
		request(f2fBaseURL, function(error, response, body) {
			cb(JSON.parse(body).recipes);
		});
	},
	userSearch: function(search, cb) {
		request(f2fBaseURL + "&q=" + search, function(error, response, body) {
				// cb(JSON.parse(body).recipes);
				cb(f2fORM.convertBodyArray(JSON.parse(body).recipes));
		});
	}
};

f2fORM.userSearch("chicken", console.log);

