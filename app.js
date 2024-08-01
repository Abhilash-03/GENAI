require('dotenv').config();
const express = require('express');
const path = require('path');
const genRoute = require('./routes/genai.route.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// route
app.use('/api/v1/ai', genRoute);

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
})
