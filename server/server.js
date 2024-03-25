import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

const app = express();
dotenv.config({ path: '../.env' }); // Läs in .env-filen

// Använd cors och express.json som middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.options('*', cors());
app.use(express.json());


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

app.post('/api/start-quiz', async (req, res) => {
  const { name, category, difficulty } = req.body;

  // Make the API call to fetch the questions
  const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&${category && `category=${category}`}&${difficulty && `difficulty=${difficulty}`}&type=multiple`);

  // Create a new user
  const [userRows] = await pool.execute(
    'INSERT INTO users (username) VALUES (?)',
    [name]
  );
  const userId = userRows.insertId;

  // Generate a UUID for the game
  const uuid = uuidv4();

  // Generate an invite URL for the game
  const inviteUrl = `http://localhost:3000/join/${uuid}`;

  // Save the game settings in the database
  await pool.execute(
    'INSERT INTO game_settings (uuid, category, difficulty, questions, user_id) VALUES (?, ?, ?, ?, ?)',
    [uuid, category, difficulty, JSON.stringify(data.results), userId]
  );

  // Send back the UUID, user ID and questions
  res.json({
    uuid,
    userId,
    questions: data.results,
    inviteUrl
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

app.post('/api/set-session', (req, res) => {
  res.send('Session set');
});

app.post('/api/join-quiz/:sessionId', async (req, res) => {
  const { name } = req.body;
  const { sessionId } = req.params;

  // Get the game settings from the database
  const [gameSettingsRows] = await pool.execute(
    'SELECT * FROM game_settings WHERE uuid = ?',
    [sessionId]
  );

  if (gameSettingsRows.length === 0) {
    res.status(404).json({ error: 'Game session not found' });
    return;
  }

  const gameSettings = gameSettingsRows[0];

  // Create a new user
  const [userRows] = await pool.execute(
    'INSERT INTO users (username) VALUES (?)',
    [name]
  );

  const userId = userRows.insertId;

  // Save the user ID in the game settings
  await pool.execute(
    'UPDATE game_settings SET user_id = ? WHERE uuid = ?',
    [userId, sessionId]
  );

  // Send the questions, userId and uuid as the response
  res.json({ questions: JSON.parse(gameSettings.questions), userId });
});

app.post('/api/save-score', async (req, res) => {
  console.log(req.body);
  const { uuid, user_id, score } = req.body;

  // Insert the score into the scores table
  await pool.execute(
    'INSERT INTO scores (uuid, user_id, score) VALUES (?, ?, ?)',
    [uuid, user_id, score]
  );

  res.json({ message: 'Score saved successfully.' });
});