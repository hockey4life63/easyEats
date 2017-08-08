$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var ingredients;
    var recipe;
    var username;

    if ($("#ingredient-field").val().trim() === "") {
        ingredients = "null";
    }
    else {
        var ingredientsArr = $("#ingredient-field").val().trim().split(",");
        for (var i = 0; i < ingredientsArr.length; i++) {
            ingredientsArr[i].replace(/\s/g, "+");
        }
        ingredients = ingredientsArr.toString();
    }

    if ($("#recipe-field").val().trim() === "") {
        recipe = "null";
    }
    else {
        var recipeArr = $("#recipe-field").val().trim().split(" ");
        recipe = recipeArr.join("+");
    }

    if ($("#username-field").val().trim() === "") {
        username = "null";
    }
    else {
        username = $("#username-field").val().trim();
    }

    if ($("#ingredient-field").val().trim() === "" && $("#recipe-field").val().trim() === "" && $("#username-field").val().trim() === "") {
        alert("Please fill out one or more search fields before submitting your search.");
    }

    window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username;
   
});
