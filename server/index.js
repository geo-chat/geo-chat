const express = require("express");
const app = express();
app.use(express.json());

const PORT = 6660;

app.listen(PORT, () => {
  console.log(`Listening for bad things to happen on ${PORT}`);
});
