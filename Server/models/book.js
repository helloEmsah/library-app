"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publication: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      page: DataTypes.STRING,
      isbn: DataTypes.INTEGER,
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
