var keys = require("../../keys");
var request = require("request");


//====Food2Fork.com====//     (returns 30 recipes to a page)
var f2fBaseURL = "http://food2fork.com/api/search?key=" + keys.food2fork_key;
var f2fOrm = {
	convertBodyArray: function(body) {
		var newBody = body.map(f2fOrm.convertRecipeObject);
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
	topRecipes: function(callback) {
		var finalURL = f2fBaseURL + "&sort=r";
		request(finalURL, function(error, response, body) {
			callback(f2fOrm.convertBodyArray(JSON.parse(body).recipes));
		});
	},
	trendingRecipes: function(callback) {
		var finalURL = f2fBaseURL + "&sort=t";
		request(finalURL, function(error, response, body) {
			callback(f2fOrm.convertBodyArray(JSON.parse(body).recipes));
		});
	}
	// search needs to be formatted as an array
	userSearch: function(search, callback) {
		var finalURL = f2fBaseURL + "&q=" + search.join("+");
		console.log(finalURL);
		request(finalURL, function(error, response, body) {
			callback(f2fOrm.convertBodyArray(JSON.parse(body).recipes));
		});
	}
};

// f2fOrm.userSearch(["chicken", "fajitas"], console.log);
// f2fOrm.topRecipes(console.log);


module.exports = f2fOrm;
