# EasyEats

A site where users can find, share, and save their favorite recipes. On your first visit to EasyEats, you can search for recipes by name, by ingredient, or by the username of the person who created that recipe. After completing signup/login with our robust user authentication, users will be able to contribute their own recipes to our database and save starred recipes to their profile page. While our authentication system is functioning, we are still working out some bugs with username searches and users adding recipes. This app uses Node/Express for the server and routing, MySQL/Sequelize for the database and models, Handlebars for the layout and views, & two recipe search APIs ([Recipe Puppy](http://www.recipepuppy.com/about/api/) & [Food2Fork](http://food2fork.com/about/api)). The custom user authentication was built using UUID, bcrypt, and JSON Web Token.

[Live Demo](https://easy-eats.herokuapp.com/)

**Team Members**
* [Alex Melancon](https://github.com/hockey4life63)
* [Bryce Miller](https://github.com/bcmiller713)
* [Jaya Arasalike](https://github.com/JayaArasalike)
* [Joseph Pamintuan](https://github.com/jpamintuan1)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development. I will assume that you already have [Node.js](https://nodejs.org/en/) and [MySQL](https://www.mysql.com/) installed locally. See deployment for notes on how to deploy the project on a live system.

1.  Install dependencies
2.  Add keys.js
3.  Sequelize setup
4.  In your CLI, go to the root of your project directory and enter **node server.js**
5.  In your browser, navigate to **http://localhost:3000**

### Dependencies

You will need to npm install the following node modules:

1.  express
2.  express-handlebars
3.  method-override
4.  body-parser
5.  bluebird
6.  bcrypt
7.  jsonwebtoken
8.  uuid
9.  mysql
10. mysql2
11. sequelize

Since we have included a package.json file, you do not need to install dependencies by name. Simply run the following in the root of your directory:

```
npm install
```

### Keys.js

If you want to use the Food2Fork API, you must register with them (free!) to get an API key. Put your key inside a keys.js file in the root of your project directory and export for use elsewhere in the app.
```
var keys = {
  food2fork_key: "yourAPIkeyhere"
};

module.exports = keys;

```

### Sequelize setup

Initialize your sequelize app by entering the following command in your CLI:
```
sequelize init:config init:models
```
This will generate a config folder including a config.json file. Ensure that the contents of the "development" object match the details of your local mysql database.

## Deployment

Follow these instructions to deploy your app live on Heroku

* Create a heroku app in your project directory
```
heroku create <projectName>
```
* Provision JawsDB MySQL add-on for your project
```
heroku addons:create jawsdb
```
* Go back to your config.json file and replace the contents of the "production" object with the details of your JawsDB database.
* Create a new connection to MySQL using your JawsDB connection info. Manually create the tables that you will need to store data.

Now your project should be successfully deployed on heroku with a functioning database.

## Screenshots

**Search by recipe name, ingredient, and username**

![screenshot-1](https://i.imgur.com/vqcB5w2.jpg)

**Recipe Results**

![screenshot-2](https://i.imgur.com/Ad47Lvt.jpg)

## Future Updates

1. [ ] Fix username search and adding recipes
2. [ ] Polish recipe results page
