const express = require("express");
const router = express.Router();
const artefactController = require("../controllers/artefactController");

// Filters artefacts
router.get('/artefacts', artefactController.filter);

// Gets all artefacts
router.get('/artefacts', artefactController.artefactList);

// Gets artefacts by id
router.get('/artefacts/:artefact_id', artefactController.artefactById);

// Posts new artefacts
router.post('/artefacts', artefactController.createArtefact);

// Updates an artefacts
router.put('/artefacts/:artefact_id', artefactController.updateArtefact);

// Deletes an artefacts
router.delete('/artefacts/:artefact_id', artefactController.deleteArtefact);

module.exports = router;