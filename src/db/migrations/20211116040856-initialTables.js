'use strict';
const {GenresSchema, GENRES_TABLE } = require('./../models/Genres')
const {PlatformsSchema, PLATFORMS_TABLE } = require('./../models/Platforms')
const {VideogamesSchema, VIDEOGAMES_TABLE } = require('./../models/Videogames')
const {VideogamesGenresSchema, VIDEOGAMES_GENRES_TABLE } = require('./../models/VideogamesGenres')
const {VideogamesPlatformsSchema, VIDEOGAMES_PLATFORMS_TABLE } = require('./../models/VideogamesPlatforms')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( GENRES_TABLE ,GenresSchema);
    await queryInterface.createTable( PLATFORMS_TABLE ,PlatformsSchema);
    await queryInterface.createTable( VIDEOGAMES_TABLE ,VideogamesSchema);
    await queryInterface.createTable( VIDEOGAMES_GENRES_TABLE ,VideogamesGenresSchema);
    await queryInterface.createTable( VIDEOGAMES_PLATFORMS_TABLE ,VideogamesPlatformsSchema);
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable(GENRES_TABLE);
      await queryInterface.dropTable(PLATFORMS_TABLE);
      await queryInterface.dropTable(VIDEOGAMES_TABLE );
      await queryInterface.dropTable(VIDEOGAMES_GENRES_TABLE );
      await queryInterface.dropTable(VIDEOGAMES_PLATFORMS_TABLE );
  }
};
