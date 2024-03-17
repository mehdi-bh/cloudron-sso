const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.json());

const data = [
  {
    id: '1',
    first_name: 'Robert',
    last_name: 'Wolfkisser',
    company: 'Wolfkisser Inc.',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
  },
  {
    id: '2',
    first_name: 'Robert',
    last_name: 'Wolfkisser',
    company: 'Wolfkisser Inc.',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
  },
  {
    id: '3',
    first_name: 'Robert',
    last_name: 'Wolfkisser',
    company: 'Wolfkisser Inc.',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
  },
];

app.listen(port, () => {

  app.get('/api/users/', async (req, res) => {
    try {
      return res.json({ user: data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/users/pending', async (req, res) => {
    try {
      return res.json({ user: data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/users/approved', async (req, res) => {
    try {
      return res.json({ user: data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/users/rejected', async (req, res) => {
    try {
      return res.json({ user: data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.put('/api/users/approve/:id', async (req, res) => {
    const { id } = req.params;
    try {
      res.send({ response: 'User approved' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.put('/api/users/reject/:id', async (req, res) => {
    const { id } = req.params;
    try {
      res.send({ response: 'User rejected' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


  // app.get('/api/users/pending', async (req, res) => {
  //   try {
  //     const result = await pool.query('SELECT * FROM users WHERE status = $1', ['PENDING']);
  //     res.json(result.rows);
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });

  // app.get('/api/users/approved', async (req, res) => {
  //   try {
  //     const result = await pool.query('SELECT * FROM users WHERE status = $1', ['APPROVED']);
  //     res.json(result.rows);
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });

  // app.get('/api/users/rejected', async (req, res) => {
  //   try {
  //     const result = await pool.query('SELECT * FROM users WHERE status = $1', ['REJECTED']);
  //     res.json(result.rows);
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });

  // app.post('/api/users', async (req, res) => {
  //   const { role, email, password } = req.body;
  //   try {
  //     await pool.query('INSERT INTO users (role, email, password, status) VALUES ($1, $2, $3, $4)', [role, email, password, 'PENDING']);
  //     res.status(201).send('User created');
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });

  // app.put('/api/users/approve/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['APPROVED', id]);
  //     res.send('User approved');
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });

  // app.put('/api/users/reject/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['REJECTED', id]);
  //     res.send('User rejected');
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });
});  