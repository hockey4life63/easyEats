module.exports = function(sequelize, DataTypes) {

 const Comment = sequelize.define("Comment", {
    comment:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    reply_to:{
      type:DataTypes.STRING,
      defaultValue:"root"
    }
  });

 Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        targerKey: "name",
        allowNull: false
      }
    });
    Comment.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};