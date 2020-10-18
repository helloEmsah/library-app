"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });
      Book.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      Book.hasMany(models.Library);
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publication: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      page: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      about: DataTypes.STRING,
      file: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
