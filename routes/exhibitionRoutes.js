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
router.post('/exhibition/:id', exhibitionController.updateExhibition);

module.exports = router;