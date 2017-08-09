$("#login").on("click", function(e){
      e.preventDefault();
      let user_info = {};
      user_info.name=$("#textfield_username").val().trim();
      user_info.password = $("#textfield_password").val().trim();
        $.post("/login/signIn",user_info, (data)=>{
            if(data.success){
                Cookies.set('userToken', data.token);
                window.location= "/home"
            }
      })
    });