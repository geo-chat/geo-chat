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

module.exports = {
  deleteAccount,
  signup,
  login,
  getUser,
  logout
};
