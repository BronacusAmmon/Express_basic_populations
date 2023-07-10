const router = require('express').Router();

//Internal Includes

const controllers = require(`../controllers/state`);


//routes
router.get('/state/:state/city/:city', controllers.getPopulation);
router.put('/state/:state/city/:city', controllers.updatePopulation)


module.exports = router;
