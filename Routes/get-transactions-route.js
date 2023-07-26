const router = require("express").Router()
const { getTransactions, getTransactionsMyAccount } = require("../Controllers/getTransactionsController")

router.post("/", getTransactions)

module.exports = router