"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    static associate(models) {
      Library.belongsTo(models.Book, {
        as: "libraryBook",
        foreignKey: "bookId",
      });

      Library.belongsTo(models.User, {
        as: "libraryUser",
        foreignKey: "userId",
      });
    }
  }
  Library.init(
    {
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Library",
    }
  );
  return Library;
};
