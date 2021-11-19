const { DataTypes, Model, Sequelize } = require("sequelize");

const GENRES_TABLE = "genres";

const GenresSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Genres extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRES_TABLE,
      modelName: "Genres",
      timestamps: false,
    };
  }
}

module.exports = {
  Genres,
  GenresSchema,
  GENRES_TABLE,
};
