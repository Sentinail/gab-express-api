const router = require("express").Router()
const { upload, getUsers, getUser, postUser, loginUser, patchUser, deleteUser, sessionLogin, logoutUser } = require("../Controllers/usersController")

router.get("/", getUsers)

router.get("/auth-session", sessionLogin)

router.get("/logout", logoutUser)

router.get("/:search", getUser)

router.post("/", postUser)

router.post("/login", loginUser)

router.patch("/", upload, patchUser)

router.delete("/", deleteUser)

module.exports = router