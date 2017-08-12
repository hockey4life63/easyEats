const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../models");
const path = require("path");
const dbOrm = require("../db/databaseQuery")
const acctManager = require("../password_auth/acctManager")

let router =express.Router();

router.get("/profile/:id", (req, res)=>{
    console.log("profile")
    let userId = req.params.id
    let renderObj ={};
    
        dbOrm.findUserStaredRecipes(userId, (results, err)=>{
            res.render("profile", results)
        })
    
})



module.exports = router;