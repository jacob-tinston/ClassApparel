const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Body Parser

// Connects Database
const db = require('./src/db/db.js');
const pool = db.pool;
const client = db.client;
const connect = db.connect;
connect();

// GET route
app.get('/test', (req, res) => {
  res.json([
      {id: 1, username: "someone"},
      {id: 2, username: "someone2"}
  ]);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});