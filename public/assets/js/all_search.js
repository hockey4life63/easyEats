$("#all-search").on("click", function() {
  
  var ingredients =$("#all-ingredient").val().trim();
  var recipe =$("#all-recipeName").val().trim();
  var username =$("#all-author").val().trim();

	if ( ingredients === "" &&  recipe === "" && username === "") {
      alert("Please fill out all search fields before submitting your search.");
  }
  else {
    var recipeArr = recipe.split(" ");
    recipe = recipeArr.join("+");
    var ingredientsArr = ingredients.split(", ");
    for (var i = 0; i < ingredientsArr.length; i++) {
        ingredientsArr[i].replace(/\s/g, "+");
    }
    ingredients = ingredientsArr.toString();
    ingredients = (ingredients === "")? "null":ingredients;
    recipe = (recipe === "")? "null" : recipe;
    username = (username === "")? "null":username;
    console.log("/api/search/" + recipe + "/" + ingredients + "/" + username + "/0")
    window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username + "/0";
  }


});


