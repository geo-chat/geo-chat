const bcrypt = require("bcryptjs");

const deleteAccount = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db.delete_account(id)
    .then(account => res.status(200).json(account))
    .catch(err => err);
};

module.exports = {
  deleteAccount
};
