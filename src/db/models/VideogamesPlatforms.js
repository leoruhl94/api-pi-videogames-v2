const { DataTypes, Model, Sequelize } = require("sequelize");
const { PLATFORMS_TABLE } = require("./Platforms");
const { VIDEOGAMES_TABLE } = require("./Videogames");

const VIDEOGAMES_PLATFORMS_TABLE = "videogames_platforms";

const VideogamesPlatformsSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  platformId: {
    field: "platform_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    refereces: {
      model: PLATFORMS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  videogameId: {
    field: "videogame_id",
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

class VideogamesPlatforms extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEOGAMES_PLATFORMS_TABLE,
      modelName: "VideogamesPlatforms",
      timestamps: false,
    };
  }
}

module.exports = {
  VideogamesPlatforms,
  VideogamesPlatformsSchema,
  VIDEOGAMES_PLATFORMS_TABLE,
};
