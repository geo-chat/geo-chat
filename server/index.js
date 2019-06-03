require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const ac = require("./controllers/authController");
const cc = require("./controllers/chatController");
const session = require("express-session");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const axios = require("axios");

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Is Watching You");
  })
  .catch(err => {
    err;
  });
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.delete("/api/auth/deleteaccount", ac.deleteAccount);
app.post("/api/auth/signup", ac.signup);
app.get("/api/auth/getuser", ac.getUser);
app.post("/api/auth/login", ac.login);
app.delete("/api/auth/logout", ac.logout);
app.put("/api/auth/editusername", ac.editUsername);
app.put("/api/auth/edithexcolor", ac.editHexColor);
app.put("/api/auth/editimg", ac.editImg);
app.put("/api/auth/editpassword", ac.editPassword);
app.post("/api/chat/create", cc.createChatRoom);
app.post("/api/chat/getrooms", cc.getRooms);
app.post("/test-upload", ac.uploadFiles);
app.get("/api/getGoogle", (req, res) => {
  axios
    .post(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyByZu5ucxdwZvoCHLRbane634jGUP7tjCo"
    )
    .then(response => {
      console.log(response.data);
      res.status(200).json(response.data);
    });
});

const PORT = 6969;

io.of("/chat").on("connection", socket => {
  socket.emit("connected", "Hello and welcome");
  console.log("New Client is connected");
  socket.on("joinRoom", room => {
    socket.join(room, () => {
      console.log(socket.rooms);
      console.log(cc);
    });
    io.of("/chat")
      .in(room)
      .emit("newUser", `new User has joined ${room}`);
    socket.emit("success", `You joined ${room}`);
  });
  socket.on("leave", room => {
    socket.leave(room);

    socket.emit("left", `left ${room}`);
  });
  socket.on("newMsg", obj => {
    io.of("/chat")
      .to(obj.room)
      .emit("msg", obj);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

http.listen(7777, () => {
  console.log("Big brother listening on 7777");
});

app.listen(PORT, () => {
  console.log(`Listening for bad things to happen on ${PORT}`);
});
