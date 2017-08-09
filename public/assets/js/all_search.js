$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var ingredients;
  var recipe;
  var username;

	if ($("#ingredient-field").val().trim() === "" || $("#recipe-field").val().trim() === "" || $("#username-field").val().trim() === "") {
      alert("Please fill out all search fields before submitting your search.");
  }
  else {
    var recipeArr = $("#recipe-field").val().trim().split(" ");
    recipe = recipeArr.join("+");
    var ingredientsArr = $("#ingredient-field").val().trim().split(", ");
    for (var i = 0; i < ingredientsArr.length; i++) {
        ingredientsArr[i].replace(/\s/g, "+");
    }
    ingredients = ingredientsArr.toString();
    username = $("#username-field").val().trim();

  }

  window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username;

});