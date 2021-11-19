const axios = require("axios");
const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class GenresService {
  constructor() {
    this.genres = [];
    this.generate();
  }

  async generate() {
    try {
      let genresApi = await axios.get(
        `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`
      );
      for (const genre of genresApi.data.results) {
        await models.Genres.findOrCreate({
          where: { id: genre.id, name: genre.name },
        });
      }
    } catch (error) {
      throw boom.notFound(error.message);
    }
  } 

  async find() {
    try {
      const allGenres = await models.Genres.findAll();
      return allGenres.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    } catch (error) {
      throw boom.notFound(error.message||"Se rompio todo");
    }
  }
}

module.exports = GenresService;
