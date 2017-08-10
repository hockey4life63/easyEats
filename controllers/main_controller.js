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
  res.sendFile(path.join(__dirname, "../public/home.html"))
})

router.get("/signup", (req,res)=>{
  //render sign up page
})

router.get("/search", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/searchByAllThree.html"))
})

router.get("/search/ingredient", (req, res)=>{
  res.sendFile(path.join(__dirname, "../public/searchByIngredient.html"))
})

router.get("/search/author", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/searchByAuthor.html"))
})

module.exports = router;



