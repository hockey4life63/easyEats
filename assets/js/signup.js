<script src="/public/assets/js/cookie.js"></script>
<script type="text/javascript">

// Cookies.set('name', 'value');

  $("#login").on("click", function(e){
      e.preventDefault();
      let user_info = {};
      user_info.name=$("#textfield_new_username").val().trim();
      user_info.password = $("#textfield_new_password").val().trim();
      passwordsMatch = $("#textfield_password_confirm").val().trim() === user_info.password;
      if(passwordsMatch){
        $.post("/login/signUp",user_info, (data)=>{
            Cookies.set('userToken');
            window.location= "/redirect/home"
      });
      }else{
        //display error
        console.log("password match : ", passwordsMatch)
      }
      
    });

    