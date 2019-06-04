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
  res.status(200).json(results);
};
const addToRoom = async (req, res) => {
  const { id, lat, lng } = req.body;
  let results = await req.app
    .get("db")
    .add_to_room([+id, +lat, +lng, 5])
    .catch(err => console.log(err));
  res.status(200).json(results);
};

const leaveRoom = async (req, res) => {
  const { id, lat, lng } = req.body;
  let results = await req.app
    .get("db")
    .leave_room([+id, +lat, +lng, 5])
    .catch(err => console.log(err));
  res.status(200).json(results);
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
