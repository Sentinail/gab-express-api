const router = require("express").Router()
const { upload, getUsers, getUser, postUser, loginUser, patchUser, deleteUser, sessionLogin, logoutUser, checkUserAccount, getUserPreference, patchUserPreference } = require("../Controllers/usersController")
const extractAndVerifyToken = require("../Middlewares/extractAndVerifyToken")

router.get("/", getUsers)

router.get("/myaccount",  checkUserAccount)

router.get("/auth-session", extractAndVerifyToken, sessionLogin)

router.get("/logout", logoutUser)

router.get("/preference", extractAndVerifyToken, getUserPreference)

router.get("/:search", getUser)

router.post("/", postUser, upload)

router.post("/login", loginUser)

router.patch("/style", extractAndVerifyToken, patchUserPreference)

router.post("/patch-user/", extractAndVerifyToken, upload, patchUser)

router.delete("/", deleteUser)

module.exports = router