const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
const port = 3035;

// Enable CORS
app.use(cors());

// Define a route to retrieve the data
app.get('/api/products', (req, res) => {
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
