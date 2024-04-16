import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './Result.css';
import axios from 'axios';
import Scoreboard from '../components/Scoreboard/Scorebard.js';
import { useContext } from 'react';
import { QuizContext } from '../QuizContext.js';

const Result = ({ name, score, uuid, userId, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const style = theme;
  const [scoreboard, setScoreboard] = useState({ topScores: [] });
  const { category, difficulty } = useContext(QuizContext);

  console.log(score);


  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

  useEffect(() => {
    axios.post('/api/save-score', {
      uuid: uuid,
      user_id: userId,
      score: score,
      category: category,
      difficulty: difficulty
    })
      .then(response => {
        console.log(response.data);
        // Fetch the updated scoreboard
        const url = `http://localhost:3000/scoreboard/${category}/${difficulty}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setScoreboard(data);
          });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [score, category, difficulty, uuid, userId]);

  return (
    <div className='result'>
      <ThemeProvider theme={style}>
        <span className='scoreTxt'>Final Score: {score}</span>
        <Scoreboard players={scoreboard.topScores} category={category} difficulty={difficulty} />
        <Button
          className='playAgain'
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
        >Back to start
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default Result;