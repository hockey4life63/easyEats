$("#add-recipe-button").on("click", () => {

    let title = $("#recipe_title");
    let img = $("#image_url");
    let ingredients = $("#ingredients");
    let instructions = $("#instructions");
    if (title.val().trim() === "" || ingredients.val().trim() === "" || instructions.val().trim() === "") {
        alert("all fields must be filled out")
    } else {
        if (Cookies.get("userToken") !== undefined) {
            let recipeObj = {
                title: title.val().trim(),
                ingredients: ingredients.val().trim(),
                recipe_steps: instructions.val().trim(),
                user_id: Cookies.get("user_id"),
                token: Cookies.get("userToken")
            }
            console.log(recipeObj)
            $.post("/api/addrecipe", recipeObj, (results) => {
                if (results.success) {
                    alert("Recipe Added");
                    title.val("")
                    img.val("")
                    ingredients.val("")
                    instructions.val("")
                }
            })
        } else {
            showModal1();
        }
    }

})