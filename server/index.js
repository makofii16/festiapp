// Our dependecies
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Let us run the server. SO its running,
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

// Let us create our database (mysql)
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "", //If you have set xampp password please enter it here
  database: "festi",
});

// Let us now create a route to the server that will register a user.

app.post("/register", (req, res) => {
  // We need to get variables sent from the form
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  // Lets create SQL statement to insert the user to the Database table Users
  const SQL = "INSERT INTO users (email, username, password) VALUES (?,?,?)"; //We are going to enter these values through a variable
  const Values = [sentEmail, sentUserName, sentPassword];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("User inserted succcessfully!");
      res.send({ message: "User added!" });
      // Let try and see
      // user has not been submitted, we need to use Express and cors
      // Successful
    }
  });
});

// Now we need to login with these credentials from a registered User
// Lets create another route
app.post("/login", (req, res) => {
  // We need to get variables sent from the form

  const sentloginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  // Lets create SQL statement to insert the user to the Database table Users
  const SQL = "SELECT * FROM users WHERE username = ? && password = ?"; //We are going to enter these values through a variable
  const Values = [sentloginUserName, sentLoginPassword];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      console.log("Error");
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: `Credentials Don't match!` });
      // This should be goood, lets try to login.
    }
  });
});
