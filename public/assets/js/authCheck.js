// $(document).ready(()=>{
//     let token = Cookies.get("userToken");
//     $.post("/login/check", {
//         token
//     }, (results)=>{
//         if(results.success){
//             //change login/signup to link to acct
//             console.log("worked!")
//             Cookies.set("useToken",results.token, {expires:7})
//         }else{
//             //keep plogin/signup and delete cookie
//             console.log("failed")
//             Cookies.remove("userToken", {path:""})
//         }
//     })
// })