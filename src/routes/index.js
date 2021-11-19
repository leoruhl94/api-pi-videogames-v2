const { Router } = require('express');
const genres = require('./genres');
const videogame = require('./videogame');
const videogames = require('./videogames');
const platforms = require('./platforms');


const router = Router();
 
router.use('/platforms', platforms);
router.use('/genres', genres);
router.use('/videogame', videogame);
router.use('/videogames', videogames);


module.exports = router;
