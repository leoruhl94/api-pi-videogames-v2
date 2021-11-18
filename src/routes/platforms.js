const { Router } = require("express");
const router = Router();
const PlatformsService = require("../services/platformsService");

const platformsService = new PlatformsService();

router.get("/", async (req, res, next) => {
  try {
    let platforms = await platformsService.find();
    res.status(200).json(platforms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
