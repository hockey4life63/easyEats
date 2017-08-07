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

router.get("/:file",(req, res)=>{
  console.log(req.params)
  let redirectPath="/"+req.params.file+".html";
  res.sendFile(path.join(__dirname, "/../html/"+redirectPath))
})


module.exports = router;


