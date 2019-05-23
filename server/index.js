require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());

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
