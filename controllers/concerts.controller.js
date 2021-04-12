const Concert = require('../models/concert.model');
const message = { message: 'OK' };

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
	try {
		const con = await Concert.findById(req.params.id);
		if(!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.postItem = async (req, res) => {
	try {
		const { performer, genre, price, day, image } = req.body;
		const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
		await newConcert.save();
		res.json(message);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.updateItem = async (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	try {
		const con = await(Concert.findById(req.params.id));
		if(con) {
			await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
			res.json(message);
		}
		else res.status(404).json({ message: 'Not found...' });
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteItem = async (req, res) => {
	try {
		const con = await(Concert.findById(req.params.id));
		if(con) {
			await Concert.deleteOne({ _id: req.params.id });
			res.json(message);
		}
		else res.status(404).json({ message: 'Not found...' });
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};