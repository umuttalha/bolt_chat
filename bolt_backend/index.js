const express = require('express');
const jwt = require("jsonwebtoken");

require('dotenv').config();


const app = express();
const port = 3000;

app.use(express.json());

const db = require("./database.js");


const userRoutes = require('./routes/authRoutes');

app.use('/auth', userRoutes);

const verifyToken = require('./middleware/verifyToken.js');
app.use(verifyToken);

app.get('/secure', (req, res) => {

  if (req.userId) {
    res.send('Bu güvenli sayfaya hoş geldiniz!');
  } else {
    res.status(401).send('Bu sayfaya erişim izniniz yok.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
