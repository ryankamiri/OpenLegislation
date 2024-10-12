const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json({ limit: "1kb" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// Set up routes
app.use('/api/legislation', require('./routes/legislation'));

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));