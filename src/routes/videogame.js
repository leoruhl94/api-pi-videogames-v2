const { Router } = require("express");
const router = Router();
const VideogamesService = require("../services/videogamesService");
const videogamesService = new VideogamesService();

const { validatePostVideogame } = require("../controllers/validations");

router.post("/", async (req, res, next) => {
  let error = validatePostVideogame(req.body);

  if (error.length)
    return res
      .status(400)
      .json({ error: true, msj: "Bad Request", data: error, status: 400 });

  try {
    let newGame = await videogamesService.add(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let game = await videogamesService.findOne(id);
    res.status(200).json(game);
  } catch (error) {
    // res
      // .status(404)
      // .json({ error: true, msj: "Sorry, game info not found", status: 404 });
    next(error);
  }
});

module.exports = router;
