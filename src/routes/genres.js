const { Router } = require("express");
const router = Router();
const { Genres } = require("../db");

router.get("/", async (req, res, next) => {
  const { genre } = req.body;

  Genres.findAll()
    .then((allGenres) => {
      let allGenresOrdered = allGenres.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      res.status(200).json(allGenresOrdered);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
