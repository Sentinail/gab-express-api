const router = require("express").Router()
const { createCheckout } = require("../Controllers/checkoutController")

router.post("/", createCheckout)

module.exports = router
