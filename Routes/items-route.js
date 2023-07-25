const router = require("express").Router()
const { getItems } = require("../Controllers/itemController")

router.get("/", getItems)

module.exports = router