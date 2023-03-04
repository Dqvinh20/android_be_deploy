const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  { tableName: "posts" }
);

module.exports = Post;
