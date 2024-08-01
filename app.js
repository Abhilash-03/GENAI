require('dotenv').config();
const express = require('express');
const genRoute = require('./routes/genai.route.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// route
app.use('/api/v1/ai', genRoute);

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
})
