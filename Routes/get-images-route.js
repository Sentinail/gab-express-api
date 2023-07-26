const router = require("express").Router()
const { getUserImage, getItemImage } = require("../Controllers/getImagesController")

router.post("/user-images", getUserImage)

router.post("/food-item-images", getItemImage)

module.exports = router