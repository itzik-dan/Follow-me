const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware.js");

//db
connectDB();

//Middleware for accepting json data in the req body
app.use(express.json());

// routes middleware
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use(require("./routes/uploadImage"));

app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

// console.log(path.resolve("frontend", "build", "index.html"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static('frontend/build'));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve("frontend", "build", "index.html")
		);
	});
}

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
