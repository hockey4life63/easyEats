  (function() {
    $("#profile-btn").hide();
      $("#results-submit").on("click", function() {

          var ingredients = $("#all-ingredient").val().trim();
          var recipe = $("#all-recipeName").val().trim();
          var username = $("#all-author").val().trim();

          if (ingredients === "" && recipe === "" && username === "") {
              alert("Please fill out all search fields before submitting your search.");
          } else {
              var recipeArr = recipe.split(" ");
              recipe = recipeArr.join("+");
              var ingredientsArr = ingredients.split(", ");
              for (var i = 0; i < ingredientsArr.length; i++) {
                  ingredientsArr[i].replace(/\s/g, "+");
              }
              ingredients = ingredientsArr.toString();
              ingredients = (ingredients === "") ? "null" : ingredients;
              recipe = (recipe === "") ? "null" : recipe;
              username = (username === "") ? "null" : username;
              console.log("/api/search/" + recipe + "/" + ingredients + "/" + username + "/0")
              window.location = "/api/search/" + recipe + "/" + ingredients + "/" + username + "/0";
          }



      });
      //'use strict';
      // var dialogButton = document.querySelector('.dialog-button');
      var dialog = document.querySelector('#dialog');
      if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
      }
      // dialogButton.addEventListener('click', function() {
      //    dialog.showModal();
      // });
      dialog.querySelector("#close-button").addEventListener("click", function() {
          $("#save-button").off("click");
          dialog.close();
      });
      $(".recipe-modal").on("click", function() {
          $("#save-button").prop("disabled", false);
          $("#recipe-title").text($(this).attr("data-title"));
          $("#img-id").attr("src", $(this).attr("data-img"))
          $("#modal-ingredients").text($(this).attr("data-ingredients"));
          $("#link-id").attr("href", $(this).attr("data-link"))
          let recipeObj = {
              title: $(this).attr("data-title"),
              img_url: $(this).attr("data-img"),
              source_url: $(this).attr("data-link"),
              ingredients: $(this).attr("data-ingredients"),
              token: Cookies.get("userToken"),
              user_id: Cookies.get("user_id")
          }
          $("#save-button").on("click", () => {
              console.log(recipeObj)
              if (Cookies.get("userToken") === undefined) {
                  showModal1();
              } else {
                  $.post("/api/addStar", recipeObj, (results) => {
                      if (results.success) {
                          alert("Recipe Saved")
                          $("#save-button").prop("disabled", true);
                      }
                  })
              }
          })
          dialog.showModal();
      })
      $("#logout-btn").on("click", (event) => {
          Cookies.remove("userToken")
          console.log(Cookies.get("userToken"))
          checkLoginStatus();
      })

      const checkLoginStatus = () => {
          let token = Cookies.get("userToken");
          $.post("/login/check", {
              token
          }, (results) => {
              if (results.success) {
                  //change login/signup to link to acct
                  $("#show-dialog1-2").hide();
                  $("#show-dialog2-2").hide();
                  $("#logout-btn").show();
                  $("#profile-btn")/show();
                   $("#profile-btn").on("click", ()=>{
                    window.location = "/user/profile/"+userId;
                  })
                  Cookies.set("userToken", results.token, { expires: 7 })
                  Cookies.set("user_id", results.id);
                  Cookies.set("userName", results.name);
              } else {
                $("#profile-btn").off("click")
                  //keep plogin/signup and delete cookie
                  $("#logout-btn").hide();
                  console.log("failed")
                  $("#show-dialog1-2").show();
                  $("#show-dialog2-2").show();
                  Cookies.remove("userToken", { path: "" })
              }
          })
      }

      $("#burger-logout").hide()
      const showModal1 = function() {
          dialog1.showModal();
      }
      const showModal2 = function() {
          dialog2.showModal();
      }
      var dialog1 = document.querySelector("#dialog1");
      var showDialog1Button1 = document.querySelector("#show-dialog1-1");
      if (!dialog1.showModal) {
          dialogPolyfill.registerDialog(dialog1);
      }
      showDialog1Button1.addEventListener("click", showModal1);
      dialog1.querySelector(".close").addEventListener("click", function() {
          dialog1.close();
      });

      var dialog2 = document.querySelector("#dialog2");
      var showDialog2Button1 = document.querySelector("#show-dialog2-1");
      if (!dialog2.showModal) {
          dialogPolyfill.registerDialog(dialog2);
      }
      showDialog2Button1.addEventListener("click", showModal2);
      dialog2.querySelector(".close").addEventListener("click", function() {
          dialog2.close();
      });

      $("#register-btn").on("click", ()=>{
        dialog1.close();
        showModal2();
      })

      $("#login1").on("click", function(e) {
          e.preventDefault();
          let user_info = {};
          user_info.name = $("#textfield_username").val().trim();
          user_info.password = $("#textfield_password").val().trim();
          $("#textfield_username").val("")
          $("#textfield_password").val("")
          $.post("/login/signIn", user_info, (data) => {
              console.log(data)
              if (data.success) {
                  Cookies.set('userToken', data.token);
                  Cookies.set("user_id", data.id);
                  Cookies.set("userName", data.name);
                  checkLoginStatus();
                  dialog1.close();
              } else {
                  alert(data.msg)
              }
          })
      });

      $("#login2").on("click", function(e) {
          e.preventDefault();
          let user_info = {};
          user_info.name = $("#textfield_new_username").val().trim();
          user_info.password = $("#textfield_new_password").val().trim();
          passwordsMatch = $("#textfield_password_confirm").val().trim() === user_info.password;
          $("#textfield_new_username").val("")
          $("#textfield_new_password").val("")
          $("#textfield_password_confirm").val("")
          if (passwordsMatch) {
              $.post("/login/signUp", user_info, (data) => {
                  if (data.success) {
                      Cookies.set('userToken', data.token);
                      Cookies.set("user_id", data.id);
                      Cookies.set("userName", data.name);
                      checkLoginStatus();
                      dialog2.close();
                  } else {
                      alert(data.msg)
                  }
              });
          } else {
              //display error
              alert("passwords dont match");
          }

      });

      $(document).ready(() => {
          checkLoginStatus();
      })

  })();