const { Router } = require("express");
const router = Router();
const GenresService = require("../services/genresService");

const genresService = new GenresService();

router.get("/", async (req, res, next) => {
  try {
    let genres = await genresService.find();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
