const axios = require("axios");
const boom = require("@hapi/boom");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class VideogamesService {
  constructor() {
    this.videogames = [];
  }
  //======================= find all ==========================
  async findAll() {
    try {
      let vgApi_1 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${1}`
      );
      let vgApi_2 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${2}`
      );
      let vgApi_3 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${3}`
      );
      let videogamesDb = await models.Videogames.findAll({
        include: ["genres"],
      });
      let games = [
        ...vgApi_1.data.results,
        ...vgApi_2.data.results,
        ...vgApi_3.data.results,
        ...videogamesDb,
      ];

      games = games.map((item) => {
        return {
          id: item.id,
          name: item.name,
          rating: item.rating,
          image: item.background_image || item.image,
          genres: item.genres?.map((x) => x.name),
          createdInDb: item.createdInDb || false,
        };
      });

      return games.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    } catch (error) {
      throw boom.notFound(error.message || "videogames not found");
    }
  }

  //======================= find by name ==========================
  async findByName(name) {
    try {
      let searchedApi = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
      );
      let findGamesDb = await models.Videogames.findAll({
        include: ["genres"],
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
      let searchedGames = [...findGamesDb, ...searchedApi.data.results];
      searchedGames = searchedGames?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          rating: item.rating,
          image: item.background_image || item.image,
          genres: item.genres?.map((x) => x.name),
          createdInDb: item.createdInDb || false,
        };
      });
      return searchedGames.sort((a, b) => {
        if (a.name.length < b.name.length) return -1;
        if (a.name.length > b.name.length) return 1;
        return 0;
      });
    } catch (error) {
      throw boom.notFound( error.message ||`search for ${name} not found`);
    }
  }

  //======================= find One ==========================
  async findOne(id) {
    if (typeof id === "string" && id.length === 36) {
      try {
        let videogame = await models.Videogames.findOne({
          where: { id },
          include: [
            "genres",
            "platforms",
          ],
        });
        return {
          name: videogame.name,
          description: videogame.description,
          released: videogame.released,
          rating: videogame.rating,
          image: videogame.image,
          platforms: videogame.platforms.map((item) => item.name),
          genres: videogame.genres.map((item) => item.name),
        };
      } catch (error) {
        throw boom.notFound( error.message || "Sorry, game info not found");
      }
    } else {
      try {
        let search = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );

        return {
          name: search.data.name,
          description: search.data.description,
          released: search.data.released,
          rating: search.data.rating,
          image: search.data.background_image,
          platforms: search.data.platforms.map((item) => item.platform.name),
          genres: search.data.genres.map((item) => item.name),
        };
      } catch (error) {
        throw boom.notFound(error.message || "Sorry, game info not found");
      }
    }
  }

  //======================= Create ==========================
  async add(item) {
    const { name, description, image, rating, released, platforms, genres } =
      item;
    const { Genres, Platforms } = models;
    try {
      const newVideogame = await models.Videogames.create({
        name,
        released,
        description,
        image,
        rating,
      });

      await newVideogame.addGenres(genres);
      await newVideogame.addPlatforms(platforms);

      return newVideogame;
    } catch (error) {
      throw boom.notFound(error.message || `add game not found`);
    }
  }
}

module.exports = VideogamesService;
