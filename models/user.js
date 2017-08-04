module.exports = function(sequelize, DataTypes) {

 var User = sequelize.define("User", {
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[4,35]
      }
    },
    pw_hash:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    uuid:{
      type:DataTypes.STRING,
    }
  });

 User.associate = function(models) {
    // Associating Userr with Posts
    // When an Userr is deleted, also delete any associated Posts
    User.hasMany(models.Recipe, {});
    User.hasMany(models.Comment, {
      onDelete: "cascade"
    });
    User.hasMany(models.Stared, {
      onDelete: "cascade"
    });
  };
  return User;
};


/*
{
  name:testUser1
  pw_hash:bcrypt.hashSync("test123", 10)
},
{
  name:testUser2
  pw_hash:bcrypt.hashSync("test123", 10)
}
*/

