const express = require('express');
const app = express();
var session = require('express-session');
const {
  PORT = 3003,
  SESSION_NAME = 'sid',
  SESSION_LIFETIME = 1000*60*60*2,  // 2hrs
  SESSION_SECRET = 'qwertyuiop'
} = process.env;

app.set('trust proxy', 1)
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Body Parser
app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true
    }
}))

// Connects Database
const db = require('./src/db/db.js');
// const pool = db.pool;
const client = db.client;
const connect = db.connect;
connect();

// Login Functionality

const login = (res, req, email, password) => {
  const query = `
    SELECT * FROM PROFILES
    WHERE email = '${email}'
    AND password = '${password}';
  `
  client.query(query, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else if (result.rows[0]) {
      const welcomeName = result.rows[0].forename;
      req.session.views  = (req.session.views || 0) + 1;
      res.status(200).json(welcomeName);
    } else {
      res.status(403).send();
    }
  })
};

// API Endpoints

app.get('/session', (req, res) => {
  if (req.session.views) { // if logged in
    res.json({loggedIn: true});
  } else {
    res.json({loggedIn: false});
  }
})

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
            res.status(200).send();
          };
        });
      } else {
        res.status(403).send();
      }
    };
  });
});

app.post('/register', (req, res, next) => { // REGISTER ACCOUNT
  const query = `
    INSERT INTO profiles (forename, surname, email, password)
    VALUES ('${req.body.forename}', '${req.body.surname}', '${req.body.email}', '${req.body.password}');
  `
  const query2 = `
    SELECT * FROM PROFILES
    WHERE email = '${req.body.email}'
    AND password = '${req.body.password}';
  `

  client.query(query, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(403).send();
    } else {
      client.query(query2, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(403).send();
        } else if (result.rows[0]) {
          const welcomeName = result.rows[0].forename;
          req.session.views  = (req.session.views || 0) + 1;
          res.status(200).json(welcomeName);
        } else {
          res.status(403).send();
        }
      })
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
      req.session.views  = (req.session.views || 0) + 1;
      res.status(200).json(welcomeName);
    } else {
      res.status(403).send();
    }
  })
});

app.get('/logout', (req, res) => { // LOGOUT
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });
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