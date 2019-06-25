const bcrypt = require("bcryptjs");
const session = require("express-session");
const fs = require("fs");
const fileType = require("file-type");
const multiparty = require("multiparty");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const { BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRECT_ACCESS_KEY } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRECT_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: BUCKET_NAME,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};
const uploadFiles = (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
};

const deleteAccount = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  db.delete_account(+id)
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
      .then(response => res.status(200).json(response[0]))
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
        username: results[0].username,
        img: results[0].img,
        hexcolor: results[0].hexcolor
      };
      res.status(200).json(results[0]);
    }
  }
};
const getUser = async (req, res) => {
  res.status(200).json(req.session.user);
};
const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};
const editUsername = async (req, res) => {
  const db = req.app.get("db");
  const { username } = req.body;
  const { id } = req.session.user;
  let user = await db.edit_username([username, +id]);
  req.session.user = {
    id: user[0].id,
    username: user[0].username,
    img: user[0].img,
    hexcolor: user[0].hexcolor
  };
  res.status(200).json(user[0]);
};
const editPassword = async (req, res) => {
  const db = req.app.get("db");
  const { oldPassword, newPassword } = req.body;
  const { id } = req.session.user;
  const result = await db.compare_password(+id).catch(err => err);
  let auth = await bcrypt.compareSync(oldPassword, result[0].password);
  if (!auth) {
    res.status(403).json("Passwords do not match");
  } else {
    let hash = await bcrypt.hash(newPassword, 10);
    db.edit_password([hash, +id]).catch(err => err);
    res.sendStatus(200);
  }
};
const editImg = async (req, res) => {
  const db = req.app.get("db");
  const { img } = req.body;
  const { id } = req.session.user;
  let user = await db.edit_img([img, +id]).catch(error => console.log(error));
  req.session.user = {
    id: user[0].id,
    username: user[0].username,
    img: user[0].img,
    hexcolor: user[0].hexcolor
  };
  res.status(200).json(user[0]);
};
const editHexColor = async (req, res) => {
  const db = req.app.get("db");
  const { hexcolor } = req.body;
  const { id } = req.session.user;
  let user = await db
    .edit_hex_color([hexcolor, +id])
    .catch(error => console.log(error));
  req.session.user = {
    id: user[0].id,
    username: user[0].username,
    img: user[0].img,
    hexcolor: user[0].hexcolor
  };
  res.status(200).json(user[0]);
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
  editHexColor,
  uploadFiles
};
