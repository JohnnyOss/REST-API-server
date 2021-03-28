const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const message = { message: 'OK' };

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const randomItem = (max) => {
      return Math.floor(Math.random() * (max));
    };
    res.json(db.testimonials[randomItem(db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
    const newItem = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    };
    db.testimonials.push(newItem);
    res.json(message);
});

app.put('/testimonials/:id', (req, res) => {
    const updatedItem = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db.testimonials[index] = updateContent;
    res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
    const deletedItem = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(deletedItem);
    db.testimonials.splice(index, 1);
    res.json(message);
});

app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
});

app.post('/concerts', (req, res) => {
    const newItem = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    };
    db.concerts.push(newItem);
    res.json(message);
});

app.put('/concerts/:id', (req, res) => {
    const updatedItem = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db.concerts[index] = updateContent;
    res.json(message);
});

app.delete('/concerts/:id', (req, res) => {
    const deletedItem = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(deletedItem);
    db.concerts.splice(index, 1);
    res.json(message);
});

app.get('/seats', (req, res) => {
    res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
    res.json(db.seats.filter(item => item.id == req.params.id));
});

app.post('/seats', (req, res) => {
    const newItem = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    };
    db.seats.push(newItem);
    res.json(message);
});

app.put('/seats/:id', (req, res) => {
    const updatedItem = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(updatedItem);
    const updateContent = ({
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    });
    db.seats[index] = updateContent;
    res.json(message);
});

app.delete('/seats/:id', (req, res) => {
    const deletedItem = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(deletedItem);
    db.seats.splice(index, 1);
    res.json(message);
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});