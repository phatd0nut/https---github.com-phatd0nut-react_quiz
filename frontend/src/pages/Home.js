import React, { useState } from 'react';
import './Home.css';
import { Button, MenuItem, TextField, InputBase } from '@material-ui/core';
import Categories, { } from '../data/Categories.js';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.js';
import { ThemeProvider } from '@material-ui/core';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Home = ({ name, setName, setQuestions, theme }) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [inviteUrl, setInviteUrl] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const startQuiz = async (category, difficulty) => {
        // Send a POST request to the server to start a new game session
        const response = await fetch('http://localhost:3001/api/start-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, category, difficulty })
        });

        if (!response.ok) {
            throw new Error('Failed to start quiz');
        }

        const data = await response.json();

        // Save the invite URL in the state
        setInviteUrl(data.inviteUrl);

        // Save the questions in the state
        setQuestions(data.questions);
        setModalIsOpen(true);
    };

    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
            setError(true);
            return;
        } else {
            setError(false);
            startQuiz(category, difficulty);
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

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    ariaHideApp={false}
                    style={{
                        content: {
                            width: '400px',
                            height: '300px',
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }
                    }}
                >
                    <h2>Invite a Friend</h2>
                    <p>Share this link to invite a friend to your quiz:</p>
                    <p>{inviteUrl}</p>
                    <Button variant='contained' color='primary' size='large' onClick={() => { setModalIsOpen(false); navigate('/quiz'); }}>Start Quiz</Button>
                </Modal>

                <img src='/quizbirdie.png' className='banner' alt='Quiz birdie' />
            </div>
        </>
    )
}

export default Home