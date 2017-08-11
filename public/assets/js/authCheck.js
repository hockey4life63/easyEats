const buildUserLink = (userId, username)=>{
    let nameTag =  $("<a>");
    nameTag.text(username);
    nameTag.attr("href", "/profile/"+userId)
    nameTag.addClass("loginLink")
      $("#login").html("")
    $("#login").append(nameTag)
}

const buildLoginLink =()=>{
    let loginTag = $("<a>");
    loginTag.text("Login/Sign up");
    loginTag.attr("href", "/login");
    loginTag.addClass("loginLink")
      $("#login").html("")
    $("#login").append(loginTag)
}

$(document).ready(()=>{
    let token = Cookies.get("userToken");
    $.post("/login/check", {
        token
    }, (results)=>{
        if(results.success){
            //change login/signup to link to acct
            buildUserLink(results.id, results.name);
            console.log("worked!")
            Cookies.set("useToken",results.token, {expires:7})
        }else{
            //keep plogin/signup and delete cookie
            buildLoginLink();
            console.log("failed")
            Cookies.remove("userToken", {path:""})
        }
    })
})
