const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getId);
router.post('/concerts', ConcertController.postItem);
router.put('/concerts/:id', ConcertController.updateItem);
router.delete('/concerts/:id', ConcertController.deleteItem);
  
module.exports = router;