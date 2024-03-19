import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import mysql from 'mysql2/promise';

const app = express();
dotenv.config({ path: '../.env' }); // Läs in .env-filen

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DATABASE);

// Använd cors som middleware
app.use(cors());

const dbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const pool = mysql.createPool(dbOptions);
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, pool);

pool.getConnection()
  .then(connection => {
    console.log('Connected to the database.');
    connection.release();
  })
  .catch(err => {
    throw err;
  });

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: false }
}));

app.get('/api/questions', async (req, res) => {
  const category = req.query.category || '';
  const difficulty = req.query.difficulty || '';
  const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&${category && `category=${category}`}&${difficulty && `difficulty=${difficulty}`}&type=multiple`);

  res.json(data.results);
});

app.post('/api/start-quiz', (req, res) => {
  const { name, category, difficulty, score } = req.body;
  req.session.quiz = { name, category, difficulty, score };
  res.send('Quiz started');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

app.get('/api/set-session', (req, res) => {
  req.session.test = 'Hello, World!';
  res.send('Session set');
});

app.get('/api/get-session', (req, res) => {
  res.send(req.session.test);
});