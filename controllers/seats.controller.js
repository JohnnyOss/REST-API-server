const Seat = require('../models/seat.model');
const message = { message: 'OK' };

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find())
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json(message);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateItem = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
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
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(message);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};