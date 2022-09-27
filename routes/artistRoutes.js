const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

// Filters artists
router.get('/artists', artistController.filter);

// Gets all artists
router.get('/artists', artistController.artistList);

// Gets artist by id
router.get('/artists/:id', artistController.artistById);

// Posts new artist
router.post('/artists', artistController.createArtist);

// Updates an artist
router.put('/artists/:id', artistController.updateArtist);

// Updates an artist
router.delete('/artists/:id', artistController.deleteArtist);

module.exports = router;