const Concert = require('../models/concert.model');
const message = { message: 'OK' };
const sanitize = require('mongo-sanitize');

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

exports.getPerformer = async (req, res) => {
	try {
		const con = await Concert.find({ performer: req.params.performer });
		if(!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.getGenre = async (req, res) => {
	try {
		const con = await Concert.find({ genre: req.params.genre });
		if(!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.getPrice = async (req, res) => {
	try {
    const con = await Concert.find({ price: {$gte: req.params.price_min, $lte: req.params.price_max }});
		if(!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.getDay = async (req, res) => {
	try {
		const con = await Concert.find({ day: req.params.day });
		if(!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.postItem = async (req, res) => {
	try {
		let cleanPerformer = sanitize(req.params.performer);
		let cleanGenre = sanitize(req.body.genre);
    let cleanImage = sanitize(req.body.image);
		const {  price, day } = req.body;
		const newConcert = new Concert({ performer: cleanPerformer, genre: cleanGenre, price: price, day: day, image: cleanImage });
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