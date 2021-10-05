const express = require("express")
const router = express.Router()
const controller = require("../controllers/api")
const controllerComputer = require("../controllers/computer")

router.get('/', controller.home)

/* COMPUTERS */
router.get('/computer', controllerComputer.home)
router.patch('/computer', controllerComputer.update)

module.exports = router