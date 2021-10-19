const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Body Parser

// Connects Database
const db = require('./src/db/db.js');
// const pool = db.pool;
const client = db.client;
const connect = db.connect;
connect();

// API Endpoints

app.post('/newsletter', (req, res) => { // NEWSLETTER SIGNUP
  const query1 = `
  SELECT * FROM newsletter
  WHERE email = '${req.body.email}';
  `

  const query2 = `
    INSERT INTO newsletter (email)
    VALUES ('${req.body.email}');
  `

  client.query(query1, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else {
      if (result.rows.length === 0) {
        client.query(query2, (err, result) => {
          if (err) {
            console.log(err.stack);
            res.status(403).send();
          } else {
            console.log('Great Success!');
            res.status(200).send();
          };
        });
      } else {
        res.status(403).send();
      }
    };
  });
});

app.post('/register', (req, res) => { // REGISTER ACCOUNT
  const query = `
    INSERT INTO profiles (forename, surname, email, password)
    VALUES ('${req.body.forename}', '${req.body.surname}', '${req.body.email}', '${req.body.password}');
  `

  client.query(query, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else {
      console.log('Great Success!');
      res.status(200).send();
    };
  });
});

app.get('/login', (req, res) => { // LOGIN
  const query = `
    SELECT * FROM PROFILES
    WHERE email = '${req.query.email}'
    AND password = '${req.query.password}';
  `
  client.query(query, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else if (result.rows[0]) {
      const welcomeName = result.rows[0].forename;
      console.log('Great Success!');
      res.status(200).json(welcomeName);
    } else {
      res.status(403).send();
    }
  })
});

app.get('/product', (req, res) => { // SELECT PRODUCT WITH SPECIFIC ID
  const query = `
    SELECT * FROM products
    WHERE id = '${req.query.id}';
  `
  client.query(query, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else if (result.rows[0]) {
      const data = result.rows[0];
      console.log('Great Success!');
      res.status(200).json(data);
    } else {
      res.status(403).send();
    }
  })
});

app.delete('/delete-acc', (req, res) => { // DELETES ACCOUNT
  const query1 = `
  SELECT * FROM profiles
  WHERE email = '${req.body.email}'
  AND password = '${req.body.password}';
  `

  const query2 = `
    DELETE FROM profiles
    WHERE email = '${req.body.email}'
    AND password = '${req.body.password}';
  `

  client.query(query1, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else {
      if (result.rows.length === 1) {
        client.query(query2, (err, result) => {
          if (err) {
            console.log(err.stack);
            res.status(403).send();
          } else {
            console.log('Great Success!');
            res.status(200).send();
          };
        });
      } else {
        res.status(403).send();
      }
    };
  });
});

app.put('/update-acc', (req, res) => { // UPDATES ACCOUNT PASSWORD
  const query1 = `
  SELECT * FROM profiles
  WHERE email = '${req.body.email}'
  AND password = '${req.body.password}';
  `
  
  const query2 = `
    UPDATE profiles
    SET password = '${req.body.newPassword}'
    WHERE email = '${req.body.email}'
    AND password = '${req.body.password}';
  `

  client.query(query1, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else {
      if (result.rows.length === 1) {
        client.query(query2, (err, result) => {
          if (err) {
            console.log(err.stack);
            res.status(403).send();
          } else {
            console.log('Great Success!');
            res.status(200).send();
          };
        });
      } else {
        res.status(403).send();
      }
    };
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});