const createChatRoom = (req, res) => {
  req.app
    .get("db")
    .create_chat_room([req.body.name, +req.body.lat, +req.body.lng]);
  res.sendStatus(200);
};

module.exports = { createChatRoom };
