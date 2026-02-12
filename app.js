import express from 'express';
import path from 'path';
import genRoute from './routes/genai.route.js';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// route
app.use('/api/v2/ai', genRoute);

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
})
