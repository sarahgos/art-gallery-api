const express = require("express");
const router = express.Router();
const exhibitionController = require("../controllers/exhibitionController");

// Filters exhibition
router.get('/exhibition', exhibitionController.filter);

// Gets all exhibition
router.get('/exhibition', exhibitionController.exhibitionList);

// Gets exhibition by id
router.get('/exhibition/:id', exhibitionController.exhibitionById);

// Posts new exhibition
router.post('/exhibition', exhibitionController.createExhibition);

// Updates an exhibition
router.put('/exhibition/:id', exhibitionController.updateExhibition);

// Deletes an exhibition
router.delete('/exhibition/:id', exhibitionController.deleteExhibition);

module.exports = router;