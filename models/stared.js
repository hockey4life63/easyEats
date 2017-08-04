module.exports = function(sequelize, DataTypes) {

 var Stared = sequelize.define("Stared", {});

 Stared.associate = function(models) {
    Stared.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Stared.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Stared;
};


/*
{
  recipe_id:1,
  user_id 1
},
{
  recipe_id:3,
  user_id 1
},
{
  recipe_id:12,
  user_id 1
},
{
  recipe_id:1,
  user_id 2
},
{
  recipe_id:3,
  user_id 1
}
*/