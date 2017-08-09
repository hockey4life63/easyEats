// Home screen search defaults to searching by recipe name

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    var recipe;
    if ($("#search-field").val().trim() === "") {
        alert("Please complete the search field before submitting your search");
    }
    else {
        var recipeArr = $("#search-field").val().trim().split(" ");
        recipe = recipeArr.join("+");
    }
    window.location = "/api/search/" + recipe + "/null/null";
});
