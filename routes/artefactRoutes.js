const express = require("express");
const router = express.Router();
const artefactController = require("../controllers/artefactController");
const { requiresAuth } = require("express-openid-connect");

// Filters artefacts
router.get('/artefacts', artefactController.filter);

// Gets all artefacts
router.get('/artefacts', artefactController.artefactList);

// Gets all artefacts
router.get('/artefacts-artist/:artist_id', artefactController.artefactsArtistList);

// Gets artefacts by id
router.get('/artefacts/:artefact_id', artefactController.artefactById);

// Posts new artefacts
router.post('/artefacts', requiresAuth(), artefactController.createArtefact);

// Updates an artefacts
router.put('/artefacts/:artefact_id', requiresAuth(), artefactController.updateArtefact);

// Deletes an artefacts
router.delete('/artefacts/:artefact_id', requiresAuth(), artefactController.deleteArtefact);

module.exports = router;