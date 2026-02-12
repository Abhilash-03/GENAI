import express from 'express';
import { genai } from '../controllers/genai.controller.js';

const router = express.Router();

router.post('/generate', genai);

export default router;