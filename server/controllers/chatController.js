const createChatRoom = (req, res) => {
  console.log(req.body);
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

  if (req.session.user.id) {
    const user = req.session.user.id;
    req.app
      .get("db")
      .add_room_to_user([+id, +user])
      .catch(err => console.log(err));
  }
  let results = await req.app
    .get("db")
    .add_to_room([+id, +lat, +lng, 5])
    .catch(err => console.log(err));
  res.status(200).json(results);
};

const leaveRoom = async (req, res) => {
  const { id, lat, lng } = req.body;
  if (req.session.user.id) {
    const user = req.session.user.id;
    req.app
      .get("db")
      .remove_room_from_user(+user)
      .catch(err => console.log(err));
  }
  let results = await req.app
    .get("db")
    .leave_room([+id, +lat, +lng, 5])
    .catch(err => console.log(err));
  res.status(200).json(results);
};
const deleteRoom = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { chatid } = req.params;
  db.delete_room([+chatid, +id])
    .then(response => res.status(200).json(response))
    .catch(err => err);
};
const getUsernames = async (req, res) => {
  const { id } = req.params;
  let usernames = await req.app
    .get("db")
    .get_usernames(+id)
    .catch(err => console.log(err));
  res.status(200).json(usernames);
};

module.exports = {
  createChatRoom,
  getRooms,
  addToRoom,
  leaveRoom,
  deleteRoom,
  getUsernames
};
