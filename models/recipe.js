module.exports = function(sequelize, DataTypes) {

 var Recipe = sequelize.define("Recipe", {
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    ingredients:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    img_url:{
      type:DataTypes.STRING
    },
    source_url:{
      type:DataTypes.STRING
    },
     recipe_steps:{
      type:DataTypes.TEXT
    },
    user_recipe: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  });


 Recipe.associate = function(models) {
    Recipe.hasMany(models.Comment, {
      onDelete: "cascade"
    });
    Recipe.hasMany(models.Stared, {
      onDelete: "cascade"
    });
    Recipe.belongsTo(models.User, {});

  };

  return Recipe;
};

/*
{
  title:"test1 article1",
  ingredients:"test1,test2,test3",
  img_url:"test1 img",
  source_url:"test1 src url"
},
{
  title:"test1 article2",
  ingredients:"test1,test2,test3",
  img_url:"test2 img",
  source_url:"test2 src url"
},
{
  title:"test1 article3",
  ingredients:"test1,test2,test3",
  img_url:"test3 img",
  source_url:"test3 src url"
},
{
  title:"test1 article3",
  ingredients:"test1,test2,test3",
  img_url:"test3 img",
  source_url:"test3 src url"
}
*/


