const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const mainRouter = require("./controllers/main_controller");
const apiRouter = require("./controllers/api_routes");
const userRouter = require("./controllers/user_routes");
const acctRouter = require("./controllers/acct_routes")
const db = require("./models");
const bcrypt = require("bcrypt");
const moment = require('moment');
const test = require("./db/databaseQuery")

moment().format();

const app = express();
const port = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use("/public", express.static("public"));

app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use("/", mainRouter);
app.use("/api", apiRouter);
app.use("/user", userRouter);
app.use("/login", acctRouter)

db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  })
    //TESTING ONLY//
   // test.testUser();
   // test.testRecipe();
   // test.testStared();
   // setTimeout(()=>{
   //      test.findUserStaredRecipes2(1, console.log)
   // }, 2000)

})

