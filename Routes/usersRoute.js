const router = require("express").Router()
const {  getUsers, getUser, postUser, loginUser, patchUser, deleteUser, sessionLogin, logoutUser} = require("../Controllers/usersController")

router.get("/", getUsers)

router.get("/auth-session", sessionLogin)

router.get("/logout", logoutUser)

router.get("/:search", getUser)

router.post("/", postUser)

router.post("/login", loginUser)

router.patch("/", patchUser)

router.delete("/", deleteUser)

module.exports = router