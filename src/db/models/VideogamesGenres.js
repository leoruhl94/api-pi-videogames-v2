const { DataTypes, Model, Sequelize } = require("sequelize");
const { GENRES_TABLE } = require("./Genres");
const { VIDEOGAMES_TABLE } = require("./videogames");

const VIDEOGAMES_GENRES_TABLE = "videogames_genres";

const VideogamesGenresSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  genreId: {
    field: "genreId",
    allowNull: false,
    type: DataTypes.INTEGER,
    refereces: {
      model: GENRES_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  videogameId: {
    field: "videogameId",
    allowNull: false,
    type: DataTypes.UUID,
    refereces: {
      model: VIDEOGAMES_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class VideogamesGenres extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEOGAMES_GENRES_TABLE,
      modelName: "VideogamesGenres",
      timestamps: false,
    };
  }
}

module.exports = {
  VideogamesGenres,
  VideogamesGenresSchema,
  VIDEOGAMES_GENRES_TABLE,
};
