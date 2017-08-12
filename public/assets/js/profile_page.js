 $("#profile-btn").hide();
$("#add-recipe-link").on("click", ()=>{
  window.location = "/addrecipe"
})
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

$("#burger-logout").on("click", (event)=>{
       Cookies.remove("userToken")
       console.log(Cookies.get("userToken"))
        checkLoginStatus();
  })
$("#burger-logout").hide()
const showModal1 = function() {
  dialog1.showModal();
}
const showModal2 = function() {
  dialog2.showModal();
}
var dialog1 = document.querySelector("#dialog1");
var showDialog1Button1 = document.querySelector("#show-dialog1-1");
var showDialog1Button2 = document.querySelector("#show-dialog1-2");
if (! dialog1.showModal) {
  dialogPolyfill.registerDialog(dialog1);
}
showDialog1Button1.addEventListener("click", showModal1);
showDialog1Button2.addEventListener("click", showModal1);
dialog1.querySelector(".close").addEventListener("click", function() {
  dialog1.close();
});

var dialog2 = document.querySelector("#dialog2");
var showDialog2Button1 = document.querySelector("#show-dialog2-1");
var showDialog2Button2 = document.querySelector("#show-dialog2-2");
if (! dialog2.showModal) {
  dialogPolyfill.registerDialog(dialog2);
}
showDialog2Button1.addEventListener("click", showModal2);
showDialog2Button2.addEventListener("click", showModal2);
dialog2.querySelector(".close").addEventListener("click", function() {
  dialog2.close();
});

const buildUserLink = (userId, username)=>{
    document.querySelector("#show-dialog1-1").removeEventListener("click",showModal1);
    document.querySelector("#show-dialog2-1").removeEventListener("click",showModal2);
    $("#burger-logout").show();
    $("#profile-btn").show();
    $("#show-dialog1-2").hide();
    $("#show-dialog2-2").hide();
    $("#profile-btn").on("click", ()=>{
      window.location = "/user/profile/"+userId;
    })
    let nameTag =  $("#show-dialog1-1");
    nameTag.text(username);
    nameTag.attr("id", "login-user");
    nameTag.on("click", ()=>{
      window.location = "/user/profile/"+userId;
    })
    let signUp = $("#show-dialog2-1");
    signUp.text("Logout"); 
    signUp.attr("id", "logout-btn")
    $("#logout-btn").on("click", (event)=>{
        console.log("clicked")
       Cookies.remove("userToken")
       console.log(Cookies.get("userToken"))
        checkLoginStatus();
    })
}

const buildLoginLink =()=>{
  $("#profile-btn").off("click")
  $("#show-dialog1-1").off("click")
  $("#profile-btn").hide();
    let loginTag = $("#login-user");
    loginTag.text("Login");
    loginTag.attr("href", "#");
    loginTag.attr("id", "show-dialog1-1");

    let logout = $("#logout-btn");
    logout.off("click");
    logout.text("Sign Up");
    logout.attr("id", "show-dialog2-1");
    document.querySelector("#show-dialog1-1").addEventListener("click", showModal1);
    document.querySelector("#show-dialog2-1").addEventListener("click", showModal2);
    $("#burger-logout").hide();
    $("#show-dialog1-2").show();
    $("#show-dialog2-2").show();
}

const checkLoginStatus = ()=>{
    let token = Cookies.get("userToken");
    $.post("/login/check", {
        token
    }, (results)=>{
        if(results.success){
            //change login/signup to link to acct
            $("#burger-logout").show();
            console.log(results)
            buildUserLink(results.id, results.name);
            console.log("worked!")
            Cookies.set("userToken",results.token, {expires:7})
            Cookies.set("user_id", results.id);
                Cookies.set("userName", results.name);
        }else{
            //keep plogin/signup and delete cookie
            buildLoginLink();
            console.log("failed")
            Cookies.remove("userToken", {path:""})
        }
    })
}

$("#login1").on("click", function(e){
      e.preventDefault();
      let user_info = {};
      user_info.name=$("#textfield_username").val().trim();
      user_info.password = $("#textfield_password").val().trim();
      $("#textfield_username").val("")
      $("#textfield_password").val("")
        $.post("/login/signIn",user_info, (data)=>{
            console.log(data)
            if(data.success){
                Cookies.set('userToken', data.token);
                Cookies.set("user_id", data.id);
                Cookies.set("userName", data.name);
                checkLoginStatus();
                dialog1.close();
            }else{
                alert(data.msg)
            }
      })
}); 

$("#login2").on("click", function(e){
      e.preventDefault();
      let user_info = {};
      user_info.name=$("#textfield_new_username").val().trim();
      user_info.password = $("#textfield_new_password").val().trim();
      passwordsMatch = $("#textfield_password_confirm").val().trim() === user_info.password;
      $("#textfield_new_username").val("")
      $("#textfield_new_password").val("")
      $("#textfield_password_confirm").val("")
      if(passwordsMatch){
        $.post("/login/signUp",user_info, (data)=>{
            if(data.success){
                Cookies.set('userToken', data.token);
                Cookies.set("user_id", data.id);
                Cookies.set("userName", data.name);
                checkLoginStatus();
                dialog2.close();
            } else{
                alert(data.msg)
            }
      });
      }else{
        //display error
        alert("passwords dont match");
      }
      
    });
$("#register-btn").on("click", ()=>{
        dialog1.close();
        showModal2();
      })
$(document).ready(()=>{
    checkLoginStatus();
})
