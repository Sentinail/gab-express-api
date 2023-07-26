const router = require("express").Router()
const { upload, getUsers, getUser, postUser, loginUser, patchUser, deleteUser, sessionLogin, logoutUser, email_giver } = require("../Controllers/usersController")

router.get("/", getUsers)

router.get("/auth-session", sessionLogin)

router.get("/logout", logoutUser)

router.get("/:search", getUser)

router.post("/", postUser)

router.post("/login", loginUser)

router.post("/patch-user/", upload, patchUser)

router.delete("/", deleteUser)

module.exports = router