var request = require("request");

//====RecipePuppy.com====//   (returns 10 recipes to a page)
var rpBaseURL = "http://www.recipepuppy.com/api/?";
var rpOrm = {

	// recipe needs to be formatted as an array
	searchByRecipe: function(recipe, callback) {
		var finalURL = rpBaseURL + "q=" + recipe.join("+");
		console.log(finalURL);
		request(finalURL, function(error, response, body) {
				callback(JSON.parse(body).results);
		});
	},

	// ingredients need to be formatted as an array
	searchByIngredients: function(ingredients, callback) {
		var finalURL = rpBaseURL + "i=" + ingredients.toString();
		console.log(finalURL);
		request(finalURL, function(error,response, body) {
			callback(JSON.parse(body).results);
		});
	},
	
	// recipe and ingredients need to be formatted as arrays
	searchByRecipeAndIngredients: function(recipe, ingredients, callback) {
		var formattedIngredients = [];
		for (i = 0; i < ingredients.length; i++) {
			formattedIngredients.push(ingredients[i].replace(" ", "+"));
		}
		var finalURL = rpBaseURL + "i=" + formattedIngredients.toString() + "&q=" + recipe.replace(" ", "+");
		console.log(finalURL);
		request(finalURL, function(error, response, body) {
				callback(JSON.parse(body).results);
		});
	},
};

// rpOrm.searchByRecipeAndIngredients(["steak", "fajitas"], ["onion", "bell pepper"], console.log);
// rpOrm.searchByIngredients(["onion", "bell pepper"], console.log);
// rpOrm.searchByRecipe(["steak", "fajitas"], console.log);

module.exports = rpOrm;