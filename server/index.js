require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const ac = require("./controllers/authController");
const cc = require("./controllers/chatController");
const session = require("express-session");
const fs = require("fs");
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/geo-chat.online/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/geo-chat.online/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/geo-chat.online/fullchain.pem")
};
const server = require("https").createServer(options);
// const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const axios = require("axios");

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET, GOOGLE_KEY } = process.env;
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
app.delete("/api/chat/deleteroom/:chatid", cc.deleteRoom);
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
app.put("/api/chat/addtoroom", cc.addToRoom);
app.put("/api/chat/leaveroom", cc.leaveRoom);
app.get("/api/chat/getUsernames/:id", cc.getUsernames);
app.get("/api/getGoogle", (req, res) => {
  axios
    .post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_KEY}`
    )
    .then(response => {
      console.log(response);
      res.status(200).json(response.data);
    });
});

const PORT = 6970;

io.of("/chat").on("connection", socket => {
  socket.emit("connected", "Hello and welcome");
  console.log("New Client is connected");
  socket.on("joinRoom", obj => {
    socket.join(obj.room, () => {
      console.log("joined room");
    });
    io.of("/chat")
      .in(obj.room)
      .emit("newUser", `${obj.username} has joined ${obj.room}`);
    socket.emit("success", `You joined ${obj.room}`);
  });
  socket.on("leave", obj => {
    socket.leave(obj.room, () => {
      console.log("left room");
    });
    io.of("/chat")
      .in(obj.room)
      .emit("left", `${obj.username} left ${obj.room}`);
  });
  socket.on("newMsg", obj => {
    io.of("/chat")
      .to(obj.room)
      .emit("msg", obj);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

server.listen(7778, () => {
  console.log("Big brother listening on 7778");
});

app.listen(PORT, () => {
  console.log(`Listening for bad things to happen on ${PORT}`);
});
