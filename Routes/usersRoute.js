const router = require("express").Router()
const {  getUsers, getUser, postUser, patchUser, deleteUser} = require("../Controllers/usersController")

router.get("/", getUsers)

router.get("/:search", getUser)

router.post("/", postUser)

router.patch("/", patchUser)

router.delete("/", deleteUser)

module.exports = router