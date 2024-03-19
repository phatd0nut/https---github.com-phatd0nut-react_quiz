import React, { useState } from 'react';
import './Home.css';
import { Button, MenuItem, TextField, InputBase } from '@material-ui/core';
import Categories, { } from '../data/Categories.js';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.js';
import { ThemeProvider } from '@material-ui/core';

const Home = ({ name, setName, fetchQuestions, theme }) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
            setError(true);
            return;
        } else {
            setError(false);
            fetchQuestions(category, difficulty);
            navigate('/quiz');
        }
    };

    return (
        <>
            <div className='content'>
                <div className='settings'>
                    <span>Setup your quiz</span> 
                    <ThemeProvider theme={theme}>
                        <div className='settings_select'>
                            {error && <ErrorMessage>Please fill in the boxes.</ErrorMessage>}

                            
                            <TextField
                                style={{ marginBottom: 15 }}
                                label='Enter your name'
                                variant="outlined"
                                onChange={(e) => setName(e.target.value)}
                                InputLabelProps={{ className: 'inputField' }}
                                inputProps={{ className: 'inputField' }}
                            />

                            <TextField
                                select
                                label='Select category'
                                variant='outlined'
                                style={{ marginBottom: 15 }}
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                InputLabelProps={{ className: 'inputField' }}
                                inputProps={{ className: 'inputField' }}
                            >
                                {Categories.map((cat) => (
                                    <MenuItem key={cat.category} value={cat.value}>
                                        {cat.category}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                label='Select difficulty'
                                variant='outlined'
                                style={{ marginBottom: 30 }}
                                onChange={(e) => setDifficulty(e.target.value)}
                                value={difficulty}
                                InputLabelProps={{ className: 'inputField' }}
                                inputProps={{ className: 'inputField' }}
                            >
                                <MenuItem key='Easy' value='easy'>Easy</MenuItem>
                                <MenuItem key='Medium' value='medium'>Medium</MenuItem>
                                <MenuItem key='Hard' value='hard'>Hard</MenuItem>
                            </TextField>

                            <Button variant='contained' color='primary' size='large'
                                onClick={handleSubmit}>
                                Start Quiz
                            </Button>
                        </div>
                    </ThemeProvider>
                </div>

                <img src='/quizbirdie.png' className='banner' alt='Quiz birdie' />
            </div>
        </>
    )
}

export default Home