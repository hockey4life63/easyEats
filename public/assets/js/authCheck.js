const buildUserLink = (userId, username)=>{
    let nameTag =  $("#show-dialog1-1");
    nameTag.text(username);
    nameTag.attr("href", "/profile/"+userId)
    nameTag.attr("id", "login-user");
    let signUp = $("show-dialog2-1");
    signUp.text("Logout"); 
}

const buildLoginLink =()=>{
    let loginTag = $("<a>");
    loginTag.text("Login/Sign up");
    loginTag.attr("href", "/login");
    loginTag.addClass("loginLink")
      $("#login").html("")
    $("#login").append(loginTag)
}

const checkLoginStatus = ()=>{
    let token = Cookies.get("userToken");
    $.post("/login/check", {
        token
    }, (results)=>{
        if(results.success){
            //change login/signup to link to acct
            console.log(results)
            buildUserLink(results.id, results.name);
            console.log("worked!")
            Cookies.set("userToken",results.token, {expires:7})
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
        $.post("/login/signIn",user_info, (data)=>{
            if(data.success){
                Cookies.set('userToken', data.token);
            }
      })
}); 

$("#login2").on("click", function(e){
      e.preventDefault();
      let user_info = {};
      user_info.name=$("#textfield_new_username").val().trim();
      user_info.password = $("#textfield_new_password").val().trim();
      passwordsMatch = $("#textfield_password_confirm").val().trim() === user_info.password;
      if(passwordsMatch){
        $.post("/login/signUp",user_info, (data)=>{
            Cookies.set('userToken', data.token);
      });
      }else{
        //display error
        console.log("password match : ", passwordsMatch)
      }
      
    });

$(document).ready(()=>{
    checkLoginStatus();
})
