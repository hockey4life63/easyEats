var request = require("request");

//====RecipePuppy.com====//
var rpBaseURL = "http://www.recipepuppy.com/api/?";
var rpORM = {
	searchByDish: function(dish, cb) {
		request(rpBaseURL + "q=" + dish, function(error, response, body) {
			for(var i = 0; i < JSON.parse(body).results.length; i++) {
				cb(JSON.parse(body).results[i].title);
				cb(JSON.parse(body).results[i].href);
				cb(JSON.parse(body).results[i].ingredients);
				cb(JSON.parse(body).results[i].thumbnail);
			}
		});
	},
	searchByIngredients: function(ingredients, cb) {
		request(rpBaseURL + "i=" + ingredients.toString(), function(error,response, body) {
			cb(JSON.parse(body));
		});
	},
	searchByDishWithIngredients: function(dish, ingredients, cb) {
		request(rpBaseURL + "i=" + ingredients.toString() + "&q=" + dish, function(error, response, body) {
			cb(JSON.parse(body));
		});
	},
};

// rpORM.searchByDish("chicken", console.log);