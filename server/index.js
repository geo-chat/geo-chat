require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const ac = require('./controllers/authController');
const session = require('express-session');

app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;
massive(CONNECTION_STRING)
	.then((db) => {
		app.set('db', db);
		console.log('Database Connected');
	})
	.catch((err) => {
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

app.delete('/api/auth/delete/:id', ac.deleteAccount);
app.post('/api/auth/signup', ac.signup);
app.get('/api/auth/getuser', ac.getUser);
app.post('/api/auth/login', ac.login);
app.delete('/api/auth/logout', ac.logout);
app.put('/api/auth/editusername', ac.editUsername);
app.put('/api/auth/edithexcolor', ac.editHexColor);
app.put('/api/auth/editimg', ac.editimg);
app.put('/api/auth/editpassword', ac.editpassword);

const PORT = 6660;

app.listen(PORT, () => {
	console.log(`Listening for bad things to happen on ${PORT}`);
});
