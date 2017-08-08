const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const db = require("../models");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const path = require("path");
const moment = require('moment');
const acctManager = require("../password_auth/acctManager")

let router =express.Router();
router.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname ,"/../html/signup.html"))
})

router.get("/test", (req, res)=>{
  let testObj = {
    recipe:[
    {
      name:"test1",
      img_url:"http://via.placeholder.com/300x200",
      ingredients:"thing1, thing2, thing3",
      src_url:"https://example.com"
    },
    {
      name:"test1",
      img_url:"http://via.placeholder.com/300x200",
      ingredients:"thing1, thing2, thing3",
      src_url:"https://example.com"
    },
    {
      name:"test1",
      img_url:"http://via.placeholder.com/300x200",
      ingredients:"thing1, thing2, thing3",
      src_url:"https://example.com"
    },
    {
      name:"test1",
      img_url:"http://via.placeholder.com/300x200",
      ingredients:"thing1, thing2, thing3",
      src_url:"https://example.com"
    },
    {
      name:"test1",
      img_url:"http://via.placeholder.com/300x200",
      ingredients:"thing1, thing2, thing3",
      src_url:"https://example.com"
    }

    ]
  }
  res.render("recipe_search", testObj)
})

router.get("/signup", (req,res)=>{
  //render sign up page
})

router.get("/search", (req, res)=>{

    //render search page
})

router.post("/search", (req, res)=>{
  //parse data is needed
  //call search api
  //render results to page
})
//TESTING ROUTE ONLY//
// router.get("/:file",(req, res)=>{
//   console.log(req.params)
//   let redirectPath="/"+req.params.file+".html";
//   res.sendFile(path.join(__dirname, "/../html/"+redirectPath))
// })

module.exports = router;



