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
