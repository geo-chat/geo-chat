require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
<<<<<<< HEAD
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
=======
const ac = require("./controllers/authController");
>>>>>>> master
app.use(express.json());

const { CONNECTION_STRING } = process.env;
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Connected");
  })
  .catch(err => {
    err;
  });

app.delete("/auth/delete/:id", ac.deleteAccount);

const PORT = 6660;

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Is Watching You");
  })
  .catch(error => console.log(error));

app.listen(PORT, () => {
  console.log(`Listening for bad things to happen on ${PORT}`);
});
