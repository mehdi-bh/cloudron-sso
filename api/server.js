const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  user: 'mehdibh',
  host: 'localhost',
  database: 'registration_db',
  password: '12345',
  port: 5432,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {

  app.get('/api/users/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/users/pending', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE status = $1', ['PENDING']);
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/users/approved', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE status = $1', ['APPROVED']);
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/users/rejected', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE status = $1', ['REJECTED']);
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.post('/api/users', async (req, res) => {
    const { role, email, password } = req.body;
    try {
      await pool.query('INSERT INTO users (role, email, password, status) VALUES ($1, $2, $3, $4)', [role, email, password, 'PENDING']);
      res.status(201).send('User created');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.put('/api/users/approve/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['APPROVED', id]);
      res.send('User approved');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.put('/api/users/reject/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['REJECTED', id]);
      res.send('User rejected');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
});  