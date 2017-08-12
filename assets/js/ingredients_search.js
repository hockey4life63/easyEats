$("#ingredient-search").on("click", function(event) {
    event.preventDefault();
    var ingredients;
    if ($("#ingredient-name").val().trim() === "") {
        alert("Please complete the search field before submitting your search");
    }
    else {
        var ingredientsArr = $("#ingredient-name").val().trim().split(", ");
        for (var i = 0; i < ingredientsArr.length; i++) {
            ingredientsArr[i].replace(/\s/g, "+");
        }
        ingredients = ingredientsArr.toString();
        window.location = "/api/search/null/" + ingredients + "/null/0";
    }
    
});

