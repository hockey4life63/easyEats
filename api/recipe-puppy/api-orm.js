var request = require("request");

//====RecipePuppy.com====//
var rpBaseURL = "http://www.recipepuppy.com/api/?";
var rpORM = {

	// dish needs to be formatted as an array
	searchByDish: function(dish, callback) {
		var finalURL = rpBaseURL + "q=" + dish.join("+");
		console.log(finalURL);
		request(finalURL, function(error, response, body) {
				callback(JSON.parse(body).results);
		});
	},

	// ingredients need to be formatted as an arrays]
	searchByIngredients: function(ingredients, callback) {
		var formattedIngredients = [];
		for (i = 0; i < ingredients.length; i++) {
			formattedIngredients.push(ingredients[i].split(" ").join("+"));
		}
		var finalURL = rpBaseURL + "i=" + formattedIngredients.toString();
		console.log(finalURL);
		request(finalURL, function(error,response, body) {
			callback(JSON.parse(body).results);
		});
	},
	
	// dish and ingredients need to be formatted as arrays
	searchByDishAndIngredients: function(dish, ingredients, callback) {
		var formattedIngredients = [];
		for (i = 0; i < ingredients.length; i++) {
			formattedIngredients.push(ingredients[i].split(" ").join("+"));
		}
		var finalURL = rpBaseURL + "i=" + formattedIngredients.toString() + "&q=" + dish.join("+");
		console.log(finalURL);
		request(finalURL, function(error, response, body) {
				callback(JSON.parse(body).results);
		});
	},
};

// rpORM.searchByDishAndIngredients(["steak", "fajitas"], ["onion", "bell pepper"], console.log);
// rpORM.searchByIngredients(["onion", "bell pepper"], console.log);
// rpORM.searchByDish(["steak", "fajitas"], console.log);

module.exports = rpORM;