const express = require("express");
const router = express.Router();
const exhibitionController = require("../controllers/exhibitionController");
const { requiresAuth } = require("express-openid-connect");

// Gets all exhibition
router.get('/exhibitions', exhibitionController.exhibitionList);

// Gets all exhibition artefacts
router.get('/exhibitions-artefacts', exhibitionController.exhibitionArtefactsList);

// Gets exhibition artefacts by exhibition id.
router.get('/exhibitions-artefacts/:exhibition_id', exhibitionController.exhibitionArtefactByExhibitionIdList);

// Gets exhibition by id
router.get('/exhibitions/:id', exhibitionController.exhibitionById);

// Posts new exhibition
router.post('/exhibitions', requiresAuth(), exhibitionController.createExhibition);

// Posts exhibition artefacts
router.post('/exhibitions-artefacts/:exhibition_id/:artefact_id', requiresAuth(), exhibitionController.addExhibitionArtefact);

// Updates an exhibition
router.put('/exhibitions/:exhibition_id', requiresAuth(), exhibitionController.updateExhibition);

// Deletes an exhibition
router.delete('/exhibitions/:exhibition_id', requiresAuth(), exhibitionController.deleteExhibition);

module.exports = router;