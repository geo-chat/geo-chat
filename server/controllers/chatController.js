let rooms = [];

const createChatRoom = (req, res) => {
  req.app
    .get("db")
    .create_chat_room([
      req.body.name,
      +req.body.lat,
      +req.body.lng,
      +req.session.user.id
    ]);
  res.sendStatus(200);
};
const getRooms = async (req, res) => {
  const { lat, lng } = req.body;
  let results = await req.app
    .get("db")
    .get_room([+lat, +lng, 5])
    .catch(err => {
      res.sendStatus(400);
    });
  rooms = [...results];
  res.status(200).json(results);
};
const addToRoom = async (req, res) => {
  const room = req.body;
  let index;
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].name === room) {
      index = i;
    }
  }
  console.log(index);
};

const leaveRoom = async (req, res) => {
  const room = req.body;
};
const deleteRoom = async (req, res) => {
  console.log(req.session.user.id);
  console.log(req.params.chatid);
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { chatid } = req.params;
  db.delete_room([+chatid, +id])
    .then(response => res.status(200).json(response))
    .catch(err => err);
};

module.exports = { createChatRoom, getRooms, addToRoom, leaveRoom, deleteRoom };
