const express = require("express")
const session = require("express-session")
const cors = require("cors")
const MongoStore = require("connect-mongo")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const { webHook } = require("./Controllers/stripeWebhookController")

const app = express()

app.use(cors({origin: [process.env.CLIENT_SIDE_URL], credentials: true}))

app.options('*', cors());

app.post('/webhook', express.raw({type: 'application/json'}), webHook)

app.use(express.json())

app.use(cookieParser())

app.use("/user-images", express.static("Images/Gab-Express-User-Profile"))   

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/myDatabase', collectionName: "session", }),
    cookie: {
        maxAge: 3600000
    }
}));

app.use("/users", require("./Routes/users-route"))

app.use("/create-checkout-session", require("./Routes/checkout-route"))

app.use("*", (req, res, next) => {
    res.send("404")
})

const port = 9000

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})