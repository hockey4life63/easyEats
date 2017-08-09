const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../models");
const path = require("path");
const dbOrm = require("../db/databaseQuery");
const f2fOrm = require("../api/food2fork/api-Orm");
const rpOrm = require("../api/recipe-puppy/api-Orm");
const acctManager = require("../password_auth/acctManager");


const buildScriptTag = (scriptName)=>{
    let scriptTag = '<script src="public/asset/js/${scriptName}"></script>'
    return scriptTag;
}

let router =express.Router();


router.post("/addStar", (req, res)=>{
    let starData = {
        UserId: req.body.user_id,
        RecipeId: req.body.recipe_id
    }
    let token = req.body.token;
    dbOrm.addStar(starData, token, (results, err)=>{
        if(err){ 
            console.log(results)
            res.json({
                err:results,
                success:false
            })
        } else{
            res.json(results)
        }
        
    })
})

router.post("/addRecipe", (req, res)=>{
    let recipe = {
        title:req.body.title,
        ingredients:req.body.ingredients,
        recipe_steps:req.body.recipe_steps,
        user_recipe:true,
        UserId: req.body.user_id
    }
    let token = req.body.token;
    req.body.img_url?recipe.img_url=req.body.img_url:null;
    dbOrm.addRecipe(recipe, token, (results, err)=>{
        if(err){ 
            res.json({
                err:results,
                success:false
            })
        } else{
            res.json(results)
        }
    })
});

router.post("/addComment", (req, res)=>{
    let comment = {
        UserId: req.body.user_id,
        comment: req.body.comment,
        reply_to:req.body.reply_to
    }
    let token = req.body.token;
    dbOrm.findRecipeId({
            title:req.body.title,
            ingredients:req.body.ingredients,
            img_url:req.body.img_url,
            source_url:req.body.source_url
          }, token,  (results)=>{
            comment.RecipeId = results;
            addComment(comment, (results, err)=>{
                if(err){
                    res.json({
                        err:results,
                        success:false
                    })
                } else{
                    res.json(results)
                }
            })
          })
});

// Get highest rated recipes from food2fork api
router.get("/topRecipes", (req, res)=>{
    f2fOrm.topRecipes((results)=>{
        res.render(results);
    });
});

// Get trending recipes from food2fork api
router.get("/trendingRecipes", (req, res)=>{
    f2f.Orm.trendingRecipes((results)=>{
        res.render(results);
    });
});

// Initial routing to occur when user has option to search by all 3 parameters
router.get("/search/:recipe/:ingredients/:username", (req, res)=>{
    let recipe = req.params.recipe==="null"?null:req.params.recipe;
    let ingredients = req.params.ingredients==="null"?null:req.params.ingredients.split(",");
    let username = req.params.username==="null"?null:req.params.username;

    if(!recipe&&!ingredients&&!username){
        //send error
        console.log("Null");
    } else if(recipe && ingredients && username){
        //search with all
        console.log("Searching by recipe, ingredients, and username");
    }else if(recipe){   
        if(ingredients){
            //search recipe/ingredidents
            console.log("Searching by recipe and ingredients");
            console.log("Recipe: " + recipe);
            rpOrm.searchByRecipeAndIngredients(recipe, ingredients, (results)=>{
                res.render("recipe_search", {recipe:results});
            });
        } else if(username){
            //search recipe/username
            console.log("Searching by username and recipe");
        } else{
            // search recipe
            console.log("Searching by recipe only")
            var recipeArr = req.params.recipe.split(",");
            rpOrm.searchByRecipe(recipeArr, (results1)=>{
                f2fOrm.userSearch(recipeArr, (results2)=>{
                    var combinedResults = [];
                    for (var i = 0; i < 6; i++) {
                        combinedResults.push(results1[i]);
                        combinedResults.push(results2[i]);
                    }
                    res.render("recipe_search", {recipe:combinedResults});
                });
            });
        }
    } else if(ingredients){
        if(username){
            //search ingredidents/username
            console.log("Searching by username and ingredients");
        }else{
            //search ingredidents
            console.log("Searching by ingredients only");
            rpOrm.searchByIngredients(req.params.ingredients, (results)=>{
                console.log(results);

                res.render("recipe_search", {recipe:results});
            });
        }
    } else{
        //username
        console.log("Searching by username only");
        dbOrm.findUserRecipe(req.params.username, (results)=>{
            res.render("recipe_search", {recipe:results});
        });
    }

});

module.exports = router;