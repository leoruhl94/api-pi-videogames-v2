const { DataTypes, Model, Sequelize } = require("sequelize");

const PLATFORMS_TABLE = "platforms";

const PlatformsSchema = {
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

class Platforms extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PLATFORMS_TABLE,
      modelName: "Platforms",
      timestamps: false,
    };
  }
}

module.exports = {
  Platforms,
  PlatformsSchema,
  PLATFORMS_TABLE,
};
