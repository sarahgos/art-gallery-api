const express = require("express");
const router = express.Router();
const artefactController = require("../controllers/artefactController");

// Filters artefacts
router.get('/artefacts', artefactController.filter);

// Gets all artefacts
router.get('/artefacts', artefactController.artefactList);

// Gets artefacts by id
router.get('/artefacts/:id', artefactController.artefactById);

// Posts new artefacts
router.post('/artefacts', artefactController.createArtefact);

// Updates an artefacts
router.put('/artefacts/:id', artefactController.updateArtefact);

// Deletes an artefacts
router.delete('/artefacts/:id', artefactController.deleteArtefact);

module.exports = router;