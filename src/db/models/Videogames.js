const { DataTypes, Model, Sequelize } = require("sequelize");

const VIDEOGAMES_TABLE = "videogames";

const VideogamesSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  released: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdInDb: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
};

class Videogames extends Model {
  static associate(models) {
    this.belongsToMany(models.Genres, {
      as: "genres",
      through: models.VideogamesGenres,
      foreignKey: "videogameId",
      otherKey: "genreId",
      timestamps: false,
    });
    this.belongsToMany(models.Platforms, {
      as: "platforms",
      through: models.VideogamesPlatforms,
      foreignKey: "videogameId",
      otherKey: "platformId",
      timestamps: false,
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEOGAMES_TABLE,
      modelName: "Videogames",
      timestamps: false,
    };
  }
}

module.exports = {
  Videogames,
  VideogamesSchema,
  VIDEOGAMES_TABLE,
};
