let rooms = [];

const createChatRoom = (req, res) => {
	req.app.get('db').create_chat_room([ req.body.name, +req.body.lat, +req.body.lng ]);
	res.sendStatus(200);
};
const getRooms = async (req, res) => {
<<<<<<< HEAD
	const { lat, lng } = req.body;
	let results = await req.app.get('db').get_room([ +lat, +lng, 5 ]).catch((err) => {
		res.sendStatus(400);
	});
	rooms = [ ...results ];
	res.status(200).json(results);
	console.log(results);
=======
  const { lat, lng } = req.body;
  let results = await req.app
    .get("db")
    .get_room([+lat, +lng, 5])
    .catch(err => {
      res.sendStatus(400);
    });
  rooms = [...results];
  console.log(rooms);
  res.status(200).json(rooms);
>>>>>>> master
};

module.exports = { createChatRoom, getRooms, rooms };
