const { Router } = require("express");
const router = Router();
const { Platforms } = require("../db");

router.get("/", async (req, res, next) => {
  Platforms.findAll()
    .then((allPlatforms) => {
      let allPlatformsOrdered = allPlatforms.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      res.status(200).json(allPlatformsOrdered);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
