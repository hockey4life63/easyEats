const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../models");
const path = require("path");
const dbOrm = require("../db/databaseQuery")
const acctManager = require("../password_auth/acctManager")

let router =express.Router();

router.post("/profile", (req, res)=>{
    let userId = req.body.user_id
    let renderObj ={};
    dbOrm.findUserRecipe(userId, (results, err)=>{
        renderObj.userRecipe = results;
        dbOrm.findUserStaredRecipes(userId, (results, err)=>{
            renderObj.staredRecipes = results;
            res.json(renderObj)
        })
    })
})



module.exports = router;