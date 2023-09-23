const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const { webHook } = require("./Controllers/stripeWebhookController")
const path = require("path")

const app = express()

app.use(cors({origin: ["http://localhost:3000", process.env.CLIENT_SIDE_URL], credentials: true}))

app.options('*', cors());

app.post('/webhook', express.raw({type: 'application/json'}), webHook)

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.enable("trust proxy")

app.use(express.static("Images/Gab-Express-User-Profile"))

app.use(express.static("Images/Gab-Express-Food-Items"))

app.use("/images", require("./Routes/get-images-route"))

app.use("/users", require("./Routes/users-route"))

app.use("/items", require("./Routes/items-route"))

app.use("/create-checkout-session", require("./Routes/checkout-route"))

app.use("/transactions", require("./Routes/get-transactions-route"))

app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = 9000

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})

// app.use(
//     session({
//         secret: process.env.MONGODB_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: new MongoStore({
//             mongoUrl: process.env.MONGODB_URI,
//             collection: 'sessions',
//         }),
//         cookie: {
//             secure: process.env.NODE_ENV === 'development' ? false : true,
//             httpOnly: process.env.NODE_ENV === 'development' ? false : true,
//             sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
//             maxAge: 36000000
//         }
//     })
// );

// app.use(session({
//     secret: "PgoHr0u5CMHJQ9fD",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, collectionName: "session", }),
//     cookie: {
//         secure: process.env.NODE_ENV === 'development' ? false : true,
//         httpOnly: process.env.NODE_ENV === 'development' ? false : true,
//         sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
//         maxAge: 36000000
//     }
// }));

// app.use("/user-images", express.static("Images/Gab-Express-User-Profile"))

// app.use("/food-item-images", express.static("Images/Gab-Express-Food-Items"))

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  
// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB Atlas');
// });

// mongoose.connection.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });