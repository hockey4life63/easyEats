  (function() {

    $("#results-submit").on("click", function() {
  
  var ingredients =$("#all-ingredient").val().trim();
  var recipe =$("#all-recipeName").val().trim();
  var username =$("#all-author").val().trim();

  if ( ingredients === "" &&  recipe === "" && username === "") {
      alert("Please fill out all search fields before submitting your search.");
  }
  else {
    var recipeArr = recipe.split(" ");
    recipe = recipeArr.join("+");
    var ingredientsArr = ingredients.split(", ");
    for (var i = 0; i < ingredientsArr.length; i++) {
        ingredientsArr[i].replace(/\s/g, "+");
    }
    ingredients = ingredientsArr.toString();
    ingredients = (ingredients === "")? "null":ingredients;
    recipe = (recipe === "")? "null" : recipe;
    username = (username === "")? "null":username;
    console.log("/api/search/" + recipe + "/" + ingredients + "/" + username + "/0")
    window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username + "/0";
  }



});
    //'use strict';
    // var dialogButton = document.querySelector('.dialog-button');
    var dialog = document.querySelector('#dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    // dialogButton.addEventListener('click', function() {
    //    dialog.showModal();
    // });
   dialog.querySelector("#close-button").addEventListener("click", function() {
    $("#save-button").off("click");
  dialog.close();
});
   $(".recipe-modal").on("click", function () {
      $("#save-button").prop( "disabled", false);
     $("#recipe-title").text($(this).attr("data-title"));
     $("#img-id").attr("src", $(this).attr("data-img"))
     $("#modal-ingredients").text($(this).attr("data-ingredients"));
     $("#link-id").attr("href", $(this).attr("data-link"))
     let recipeObj ={
          title:$(this).attr("data-title"),
          img_url:$(this).attr("data-img"),
          source_url:$(this).attr("data-link"),
          ingredients:$(this).attr("data-ingredients"),
          token:Cookies.get("userToken"),
          user_id: Cookies.get("user_id")
        }
     $("#save-button").on("click", ()=>{
      console.log(recipeObj)
      if(Cookies.get("userToken")===undefined){
        alert("must be signed in to save recipes")
      } else {
        $.post("/api/addStar", recipeObj, (results)=>{
          if(results.success){
            alert("Recipe Saved")
            $("#save-button").prop( "disabled", true );
          }
        })
      }
     })
      dialog.showModal();
   })
$("#logout-btn").on("click", (event)=>{
       Cookies.remove("userToken")
       console.log(Cookies.get("userToken"))
        checkLoginStatus();
    })

const checkLoginStatus = ()=>{
    let token = Cookies.get("userToken");
    $.post("/login/check", {
        token
    }, (results)=>{
        if(results.success){
            //change login/signup to link to acct
            $("#burger-logout").show();
            $("#logout-btn").show();
            Cookies.set("userToken",results.token, {expires:7})
            Cookies.set("user_id", results.id);
                Cookies.set("userName", results.name);
        }else{
            //keep plogin/signup and delete cookie
            $("#logout-btn").hide();
            buildLoginLink();
            console.log("failed")
            Cookies.remove("userToken", {path:""})
        }
    })
}

$(document).ready(()=>{
    checkLoginStatus();
})

  })();