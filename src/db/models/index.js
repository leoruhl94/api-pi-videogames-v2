const { Genres, GenresSchema, GENRES_TABLE } = require("./Genres");
const { Platforms, PlatformsSchema, PLATFORMS_TABLE } = require("./Platforms");
const {
  Videogames,
  VideogamesSchema,
  VIDEOGAMES_TABLE,
} = require("./Videogames");
const {
  VideogamesGenres,
  VideogamesGenresSchema,
  VIDEOGAMES_GENRES_TABLE,
} = require("./VideogamesGenres");
const {
  VideogamesPlatformsSchema,
  VideogamesPlatforms,
  VIDEOGAMES_PLATFORMS_TABLE,
} = require("./VideogamesPlatforms");

function setupModels(sequelize) {
  Genres.init(GenresSchema, Genres.config(sequelize));
  Platforms.init(PlatformsSchema, Platforms.config(sequelize));
  Videogames.init(VideogamesSchema, Videogames.config(sequelize));
  VideogamesGenres.init(
    VideogamesGenresSchema,
    VideogamesGenres.config(sequelize)
  );
  VideogamesPlatforms.init(
    VideogamesPlatformsSchema,
    VideogamesPlatforms.config(sequelize)
  );

  Videogames.associate(sequelize.models);
}

module.exports = setupModels;
