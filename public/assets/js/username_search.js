$("#author-search").on("click", function() {
    var username;
    if ($("#author-name").val().trim() === "") {
        alert("Please complete the search field before submitting your search");
    }
    else {
        username = $("#author-name").val().trim();
        window.location = "/api/search/null/null/" + username + "/0";
    }
   
});