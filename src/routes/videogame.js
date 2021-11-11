const { Router } = require("express");
const router = Router();
const { Videogames, Genres, Platforms } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const { validatePostVideogame } = require("../controllers/validations");

router.post("/", async (req, res, next) => {
  const { name, description, image, rating, released, platforms, genres } =
    req.body;
  let error = validatePostVideogame(req.body);

  if (error.length)
    return res
      .status(400)
      .json({ error: true, msj: "Bad Request", data: error, status: 400 });

  try {
    const newVideogame = await Videogames.create({
      name,
      released,
      description,
      image,
      rating,
    });
    await newVideogame.addGenres(genres);
    await newVideogame.addPlatforms(platforms);

    res.status(201).json(newVideogame.id);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (typeof id === "string" && id.length === 36) {
    try {
      let videogame = await Videogames.findOne({
        where: { id },
        include: [
          { model: Genres, attributes: ["name"], through: { attributes: [] } },
          {
            model: Platforms,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });
      res.json({
        name: videogame.name,
        description: videogame.description,
        released: videogame.released,
        rating: videogame.rating,
        image: videogame.image,
        platforms: videogame.platforms.map((item) => item.name),
        genres: videogame.genres.map((item) => item.name),
      });
    } catch (error) {
      res.status(400).json({
        error: true,
        msj: "Sorry, game info not found",
        status: 400,
      });
      next(error);
    }
  } else {
    try {
      let search = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const {
        name,
        description,
        released,
        rating,
        platforms,
        background_image,
        genres,
      } = search.data;
      res.json({
        name,
        description,
        released,
        rating,
        image: background_image,
        platforms: platforms.map((item) => item.platform.name),
        genres: genres.map((item) => item.name),
      });
    } catch (error) {
      res
        .status(404)
        .json({ error: true, msj: "Sorry, game info not found", status: 404 });
      next(error);
    }
  }
});

module.exports = router;
