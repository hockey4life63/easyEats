const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../models");
const path = require("path");
const dbOrm = require("../db/databaseQuery");
const f2fOrm = require("../api/food2fork/api-Orm");
const rpOrm = require("../api/recipe-puppy/api-Orm");
const acctManager = require("../password_auth/acctManager");


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

// Search by recipe from food2fork api & recipe puppy api
router.get("/search/:recipe", (req, res)=>{
    var recipeArr = req.params.recipe.split(",");
    rpOrm.searchByRecipe(recipeArr, (results1)=>{
        f2fOrm.userSearch(recipeArr, (results2)=>{
            var combinedResults = [];
            for (var i = 0; i < 6; i++) {
                combinedResults.push(results1[i]);
                combinedResults.push(results2[i]);
            }
            res.render(combinedResults);
        });
    });
});

// Search by ingredients from recipe puppy api
router.get("/search/:ingredients", (req, res)=>{
    rpOrm.searchByIngredients(req.params.ingredients, (results)=>{
        res.render(results);
    });
});

// Search by username from mysql database of user-submitted recipes
router.get("/search/:username", (req, res)=>{
    dbOrm.findUserRecipe(req.params.username, (results)=>{
        res.render(results);
    });
})

// Search by recipe and ingredients from recipe puppy api
router.get("/search/:recipe/:ingredients", (req, res)=>{   
    rpOrm.searchByRecipeAndIngredients(req.params.recipe, req.params.ingredients, (results)=>{
        res.render(results);
    });
});

// Search by recipe and username from mysql database
router.get("/search/:recipe/:username", (req, res)=>{
    // method for querying db by recipe
});

// Search by ingredients and username from mysql database
router.get("/search/:ingredients/:username", (req, res)=>{
    // method for querying db by ingredients
});

// Initial routing to occur when user has option to search by all 3 parameters
router.get("/search/:recipe/:ingredients/:username", (req, res)=>{
    if (req.params.recipe === "null" && req.params.ingredients === "null" && req.params.username === "null") {
        throw (err);
    }
    else if (req.params.recipe === "null" && req.params.ingredients === "null" && req.params.username !== "null") {
        // redirect to searching only by username
    }
    else if (req.params.recipe === "null" && req.params.ingredients !== "null" && req.params.username === "null") {
        // redirect to searching only by ingredients
    }
    else if (req.params.recipe !== "null" && req.params.ingredients === "null" && req.params.username === "null") {
        // redirect to searching only by recipe
    }
    else if (req.params.recipe === "null" && req.params.ingredients !== "null" && req.params.username !== "null") {
        // redirect to searching by username and ingredients
    }
    else if (req.params.recipe !== "null" && req.params.ingredients === "null" && req.params.username !== "null") {
        // redirect to searching by username and recipe
    }
    else if (req.params.recipe !== "null" && req.params.ingredients !== "null" && req.params.username === "null") {
        // redirect to searching by recipe and ingredients
    }
    else if (req.params.recipe !== "null" && req.params.ingredients !== "null" && req.params.username !== "null") {
        // search by all parameters
    }
});

module.exports = router;