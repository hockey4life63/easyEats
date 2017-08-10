const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../models");
const path = require("path");
const dbOrm = require("../db/databaseQuery")
const acctManager = require("../password_auth/acctManager")


let router =express.Router();

// router.get("/", (req, res)=>{
//     //render login page
// })

router.post("/signup", (req, res) =>acctManager.createAcct(req.body, results => res.json(results)))

router.post("/signin", (req, res) => {acctManager.comparePassword(req,results=>res.json(results))})

router.post("/check", (req, res) => {
    //body needs token
    acctManager.checkUuid(req.body, response => {
        if(response.success){
            const resObj = {
            name: req.body.name,
            id: req.body.id,
            token: response.token,
            success: true,
            msg: "Valid Session"
            }
            res.json(resObj)
        } else{
            res.json({
                msg:"invalid token",
                success:false
            })
        }
        
    })
})


module.exports = router;