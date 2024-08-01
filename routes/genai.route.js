const express = require('express');
const genai = require('../controllers/genai.controller.js');

const router = express.Router();

router.post('/generate', genai);

module.exports = router;