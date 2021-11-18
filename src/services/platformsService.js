const axios = require("axios");
const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class PlatformsService {
  constructor() {
    this.platforms = [];
    this.generate();
  }

  async generate() {
    try {
      let platformsApi = await axios.get(
        `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`
      );

      for (const platform of platformsApi.data.results) {
        await models.Platforms.findOrCreate({
          where: { id: platform.id, name: platform.name },
        });
      }
    } catch (error) {
      throw boom.notFound("couldn't get platforms from api");
    }
  }

  async find() {
    try {
      const allGenres = await models.Platforms.findAll();
      return allGenres.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    } catch (error) {
      throw boom.notFound("platforms not found");
    }
  }
}

module.exports = PlatformsService;
