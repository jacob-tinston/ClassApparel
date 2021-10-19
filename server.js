const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// GET route
app.get('/backend', (req, res) => { //Line 9
  res.json([
      {id: 1, username: "someone"},
      {id: 2, username: "someone2"}
  ]);
});