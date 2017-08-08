const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../models");
const path = require("path");
const dbOrm = require("../db/databaseQuery");
const f2fOrm = require("../api/food2fork/api-orm");
const rpOrm = require("../api/recipe-puppy/api-orm");
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

router.get("/topRecipes-f2f", (req, res)=>{
    f2fOrm.highestRatedRecipes(function(results) {
        res.json(results);
    });
});

router.get("/searchRecipes-f2f", (req, res)=>{
    f2fOrm.userSearch(req.body.search, (results)=>{
        res.json(results);
    });
});

router.get("/searchByDish-rp", (req, res)=>{
    rpOrm.searchByDish(req.body.dish, (results)=>{
        res.json(results);
    });
});

router.get("/searchByIngredients-rp", (req, res)=>{
    rpOrm.searchByIngredients(req.body.ingredients, (results)=>{
        res.json(results);
    });
});

router.get("/searchByDishAndIngredients-rp", (req, res)=>{
    rpOrm.searchByDishAndIngredients(req.body.dish, req.body.ingredients, (results)=>{
        res.json(results);
    });
});

module.exports = router;