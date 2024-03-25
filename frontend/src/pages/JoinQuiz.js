import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './JoinQuiz.css';

const JoinQuiz = ({ setName, setQuestions, setUserId, setUuid }) => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { sessionId } = useParams();

    const joinQuiz = async () => {
        try {
            const response = await axios.post(`/api/join-quiz/${sessionId}`, { name: username });
            setName(username);
            setQuestions(response.data.questions);
            setUserId(response.data.userId);
            setUuid(sessionId);
            navigate('/quiz');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id='joinQuiz'>
            <TextField
                id='joinQuiz_inputName'
                style={{ marginBottom: 15 }}
                label='Enter your name'
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ id: 'joinQuiz_inputName' }}
                inputProps={{ id: 'joinQuiz_inputName' }}
            />

            <Button variant='contained' color='primary' size='large' onClick={joinQuiz}>
                Start Quiz
            </Button>
        </div>
    );
};

export default JoinQuiz;