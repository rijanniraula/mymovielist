const express = require("express");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const db = require("./db");

const addMovieRoute = require("./routes/add-movie"); //add-movie route
const editMovieRoute = require("./routes/edit-movie"); //edit-movie route
const deleteMovieRoute = require("./routes/delete-movie"); //delete-movie route

const searchMovieTitleRoute = require("./routes/search-movie-title"); //search-movie-title route
const getMovieByIdRoute = require("./routes/get-movie-by-id"); //get-movie-by-id route
const getMovieRoute = require("./routes/get-movie"); //get-movie-by-id route
const watchlistRoute = require("./routes/watchlist"); //wishlist route

const adminLoginRoute = require("./routes/admin-login"); //admin-login route

const userLoginRoute = require("./routes/user-login"); //user-login route
const userRegistration = require("./routes/user-registration"); //user-registration route
const getUserData = require("./routes/get-user-data"); //get-user-data route

const submitReview = require("./routes/submit-review"); //submit-review

const totalMovieRoute = require("./routes/total-movies"); //total-movies route
const totalUsersRoute = require("./routes/total-users"); //total-users route
const manageUsersRoute = require("./routes/manage-users"); //manage-users route

const recommendationsRoute = require("./routes/recommend"); //recommendation route

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); //parsing JSON requests
app.use(express.urlencoded({ extended: true })); //parsing form data

// Routes
app.use("/add-movie", addMovieRoute); //add-movie route
app.use("/edit-movie", editMovieRoute); //add-movie route
app.use("/delete-movie", deleteMovieRoute); //delete-movie route
app.use("/total-movies", totalMovieRoute); //total-movie route
app.use("/total-users", totalUsersRoute); //total-movie route
app.use("/manage-users", manageUsersRoute); //manage-movie route

app.use("/search-movie-title", searchMovieTitleRoute); //search-movie-title route
app.use("/get-movie-by-id", getMovieByIdRoute); //get-movie-by-id route
app.use("/get-movie", getMovieRoute); //get-movie route
app.use("/watchlist", watchlistRoute); //watch-list route

app.use("/admin-login", adminLoginRoute); //admin-login route

app.use("/user-login", userLoginRoute); //user-login route
app.use("/user-registration", userRegistration); //user-registration route
app.use("/get-user-data", getUserData); //get-user-data route

app.use("/submit-review", submitReview); //submit-review route

app.use("/recommend", recommendationsRoute); //recommendation route

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  return res.json("From backend");
});

const authenticateToken = require("./middleware/authenticateToken");
router.get("/protected-route", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route!", user: req.user });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.listen(8081, () => {
  console.log("Listing to port 8081");
});
