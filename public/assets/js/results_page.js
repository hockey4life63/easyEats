$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var ingredients;
    var recipe;
    var username;

    if ($("#ingredient-field").val().trim() === "") {
        ingredients = "null";
    }
    else {
        var ingredientsArr = $("#ingredient-field").val().trim().split(", ");
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
    } else{
        window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username + "/0";
    }

    
   
});

var dialog1 = document.querySelector("#dialog1");
var showDialog1Button1 = document.querySelector("#show-dialog1-1");
var showDialog1Button2 = document.querySelector("#show-dialog1-2");
if (! dialog1.showModal) {
  dialogPolyfill.registerDialog(dialog1);
}
showDialog1Button1.addEventListener("click", function() {
  dialog1.showModal();
});
showDialog1Button2.addEventListener("click", function() {
  dialog1.showModal();
});
dialog1.querySelector(".close").addEventListener("click", function() {
  dialog1.close();
});

var dialog2 = document.querySelector("#dialog2");
var showDialog2Button1 = document.querySelector("#show-dialog2-1");
var showDialog2Button2 = document.querySelector("#show-dialog2-2");
if (! dialog2.showModal) {
  dialogPolyfill.registerDialog(dialog2);
}
showDialog2Button1.addEventListener("click", function() {
  dialog2.showModal();
});
showDialog2Button2.addEventListener("click", function() {
  dialog2.showModal();
});
dialog2.querySelector(".close").addEventListener("click", function() {
  dialog2.close();
});

