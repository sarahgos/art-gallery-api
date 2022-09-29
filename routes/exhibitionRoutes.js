const express = require("express");
const router = express.Router();
const exhibitionController = require("../controllers/exhibitionController");
const { requiresAuth } = require("express-openid-connect");

// Filters exhibition
router.get('/exhibition', exhibitionController.filter);

// Gets all exhibition
router.get('/exhibition', exhibitionController.exhibitionList);

// Gets all exhibition artefacts
router.get('/exhibition-artefacts', exhibitionController.exhibitionArtefactsList);

// Gets exhibition artefacts by exhibition id.
router.get('/exhibition-artefacts/:exhibition_id', exhibitionController.exhibitionArtefactByExhibitionIdList);

// Gets exhibition by id
router.get('/exhibition/:id', exhibitionController.exhibitionById);

// Posts new exhibition
router.post('/exhibition', requiresAuth(), exhibitionController.createExhibition);

// Posts exhibition artefacts
router.post('/exhibition-artefacts/:exhibition_id/:artefact_id', requiresAuth(), exhibitionController.addExhibitionArtefact);

// Updates an exhibition
router.put('/exhibition/:exhibition_id', requiresAuth(), exhibitionController.updateExhibition);

// Deletes an exhibition
router.delete('/exhibition/:exhibition_id', requiresAuth(), exhibitionController.deleteExhibition);

module.exports = router;