// Home screen search defaults to searching by recipe name

$("#home-search").on("click", function() {
    var recipe;
    if ($("#user-input").val().trim() === "") {
        alert("Please complete the search field before submitting your search");
    }
    else {
        var recipeArr = $("#user-input").val().trim().split(" ");
        recipe = recipeArr.join("+");
        window.location = "/api/search/" + recipe + "/null/null/0";
    }
});

