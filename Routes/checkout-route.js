const router = require("express").Router()
const { createCheckout } = require("../Controllers/checkoutController")
const extractAndVerifyToken = require("../Middlewares/extractAndVerifyToken")

router.post("/", extractAndVerifyToken, createCheckout)

module.exports = router
