const express = require('express');
const room = require('../controllers/roomController.js');
const router = express.Router();

router.get('/newSession', room.createNewRoom);
router.get('/roomStatus', room.getRoomStatus);


module.exports = router;
