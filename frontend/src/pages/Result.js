import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './Result.css';

const Result = ({ name, score, theme }) => {
  const navigate = useNavigate();
  const style = theme;
  
  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

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