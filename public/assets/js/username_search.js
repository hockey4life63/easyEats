$("#search-btn").on("click", function(event) {
    event.preventDefault();
    var username;
    if ($("#search-field").val().trim() === "") {
        alert("Please complete the search field before submitting your search");
    }
    else {
        username = $("#search-field").val().trim();
    }
    window.location = "/api/search/null/null/" + username;
});