const express = require("express")
const session = require("express-session")
const cors = require("cors")
const MongoStore = require("connect-mongo")

const app = express()

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json())

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/myDatabase', collectionName: "session", }),
    cookie: {
        maxAge: 100000,
    }
}));

app.use("/users", require("./Routes/usersRoute"))

app.use("*", (req, res, next) => {
    res.send("404")
})

app.listen(9000, () => {
    console.log("listening on Port: 9000")
})