$("#all-search").on("click", function() {
  
  var ingredients;
  var recipe;
  var username;

	if ($("#all-recipeName").val().trim() === "" || $("#all-ingredient").val().trim() === "" || $("#all-author").val().trim() === "") {
      alert("Please fill out all search fields before submitting your search.");
  }
  else {
    var recipeArr = $("#all-recipeName").val().trim().split(" ");
    recipe = recipeArr.join("+");
    var ingredientsArr = $("#all-ingredient").val().trim().split(", ");
    for (var i = 0; i < ingredientsArr.length; i++) {
        ingredientsArr[i].replace(/\s/g, "+");
    }
    ingredients = ingredientsArr.toString();
    username = $("#all-author").val().trim();
  }

  window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username + "/0";

});