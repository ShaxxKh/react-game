require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

mongoose.connect(
	"mongodb+srv://ShaXx:14321432@cluster0.xldkl.mongodb.net/React-game",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("Mongoose is connected")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = [
	"http://localhost:3000",
	"http://localhost:4000",
	"https://shaxxkh-react-game.herokuapp.com",
];
const corsOptions = {
	origin: function (origin, callback) {
		console.log("** Origin of request " + origin);
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			console.log("Origin acceptable");
			callback(null, true);
		} else {
			console.log("Origin rejected");
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(
	session({
		secret: "secretcode",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(cookieParser("secretcode"));

app.post("/statistics", (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

if (process.env.NODE_ENV === "production") {
	// Serve any static files
	app.use(express.static(path.join(__dirname, "client/build")));
	// Handle React routing, return all requests to React app
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

app.listen(process.env.PORT || 4000, () => {
	console.log("server ran up");
});
