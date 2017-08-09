$("#ingredient-search").on("click", function(event) {
    event.preventDefault();
    var ingredientArr = $("#ingredient-search").val().split(" ");
    var currentURL = window.location.origin;
    $.get(currentURL + "/api/searchByIngredients-rp", function(data) {
        console.log(data);
        $("#title-div").append(data.title);
        $("#image-div").append(data.thumbnail);
        $("#ingredient-div").append(data.ingredients);
        $("#link-div").append(data.href);
    });
});

$("#recipe-search").on("click", function() {
    event.preventDefault();
    var recipeArr = $("#recipe-search").val().split(" ");
    var currentURL = window.location.origin;
    $.get(currentURL + "/api/searchByDish-rp", function(data) {
        console.log(data);
        $("#title-div").append(data.title);
        $("#image-div").append(data.thumbnail);
        $("#ingredient-div").append(data.ingredients);
        $("#link-div").append(data.href);
    });
});
