const router = require("express").Router();
const controllers = require("../controllers/addressControllers")

router.post("/area", controllers.searchArea)
router.post("/city", controllers.searchAddress)

module.exports = router;