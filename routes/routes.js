const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const artefactController = require("../controllers/artefactController");

// Filters artists
router.get('/artists', artistController.filter);

// Gets all artists
router.get('/artists', artistController.artistList);

// Gets artist by id
router.get('/artists/:id', artistController.artistById);

// Posts new artist
router.post('/artists', artistController.createArtist);

// Updates an artist
router.post('/artists/:id', artistController.updateArtist);

// Filters artefacts
router.get('/artefacts', artefactController.filter);

// Gets all artefacts
router.get('/artefacts', artefactController.artefactList);

// Gets artefacts by id
router.get('/artefacts/:id', artefactController.artefactById);

// Posts new artefacts
router.post('/artefacts', artefactController.createArtefact);

// Updates an artefacts
router.post('/artefacts/:id', artefactController.updateArtefact);

module.exports = router;