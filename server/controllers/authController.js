const bcrypt = require("bcryptjs");

const deleteAccount = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db.delete_account(id)
    .then(account => res.status(200).json(account))
    .catch(err => err);
};

const signup = async (req, res) => {
  const db = req.app.get("db");
  const { username, password } = req.body;
  const taken = await db.verify(username).catch(err => err);
  if (taken[0]) {
    res.status(403).json("username is already taken");
  } else {
    let hash = await bcrypt.hash(password, 10);
    db.signup([username, hash])
      .then(response => res.status(200).json(response))
      .catch(err => err);
  }
};
const login = async (req, res) => {
  const db = req.app.get("db");
  const { username, password } = req.body;
  const results = await db.verify(username);
  if (!results[0]) {
    res.status(403).json("Wrong username or password");
  } else {
    let auth = await bcrypt.compareSync(password, results[0].password);
    if (!auth) {
      res.status(403).json("Wrong username or password");
    } else {
      req.session.user = {
        id: results[0].id,
        username: results[0].username
      };
      res.status(200).json(results[0]);
    }
  }
};
const getUser = async (req, res) => {
  const { session } = req;
  if (!session.user) {
    session.user = { username: "", id: 0 };
  }
};
const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};
const editUsername = (req, res) => {
  const db = req.app.get("db");
  const { username } = req.body;
  const { id } = req.session.user;
  db.edit_username([username, +id]);
};
const editPassword = async (req, res) => {
  const db = req.app.get("db");
  const { oldPassword, newPasword } = req.body;
  const { id } = req.session.user;
  const result = await db.compare_password(+id).catch(err => err);
  let auth = await bcrypt.compareSync(oldPassword, result[0].password);
  if (!auth) {
    res.status(403).json("Passwords do not match");
  } else {
    let hash = await bcrypt.hash(newPasword, 10);
    db.edit_password([hash, +id]).catch(err => err);
    res.sendStatus(200);
  }
};
const editImg = (req, res) => {
  const db = req.app.get("db");
  const { img } = req.body;
  const { id } = req.session.user;
  db.edit_img([img, +id]);
};
const editHexColor = (req, res) => {
  const db = req.app.get("db");
  const { hexcolor } = req.body;
  const { id } = req.session.user;
  db.edit_hex_color([hexcolor, +id]);
};
module.exports = {
  deleteAccount,
  signup,
  login,
  getUser,
  logout,
  editUsername,
  editPassword,
  editImg,
  editHexColor
};
