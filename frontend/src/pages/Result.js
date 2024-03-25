import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './Result.css';
import axios from 'axios';

const Result = ({ name, score, uuid, userId, theme }) => {
  const navigate = useNavigate();
  const style = theme;

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

  useEffect(() => {
    console.log(`UUID: ${uuid}, User ID: ${userId}, Score: ${score}`);
    // Save the score when the component mounts
    axios.post('/api/save-score', {
      uuid: uuid,
      user_id: userId,
      score: score
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className='result'>
      <ThemeProvider theme={style}>
        <span className='scoreTxt'>Final Score: {score}</span>
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