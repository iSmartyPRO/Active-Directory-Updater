const express = require("express")
const router = express.Router()
const controller = require("../controllers/api")
const controllerComputer = require("../controllers/computer")
const controllerUser = require("../controllers/user")

router.get('/', controller.home)

/* COMPUTERS */
router.get('/computer', controllerComputer.home)
router.patch('/computer', controllerComputer.update)

/* USERS */
router.get('/user', controllerUser.home)
router.patch('/user', controllerUser.update)

module.exports = router