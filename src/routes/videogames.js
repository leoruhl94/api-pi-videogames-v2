const { Router } = require("express");
const router = Router();
const VideogamesService = require("../services/videogamesService");

const videogamesService = new VideogamesService();

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  if (name) {
    try {
      let games = await videogamesService.findByName(name);
      games.length
        ? res.status(200).json(games.slice(0, 15))
        : res
            .status(200)
            .json([{ error: true, msj: `No hay resulados para: ${name}` }]);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let games = await videogamesService.findAll();
      res.json(games);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
