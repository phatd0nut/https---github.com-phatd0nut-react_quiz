import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './JoinQuiz.css';
import { QuizContext } from '../QuizContext.js';
import Categories from '../data/Categories.js';
import he from 'he';

const JoinQuiz = ({ setName, setQuestions, setUserId, setUuid, setScore }) => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const { category, setCategory, difficulty, setDifficulty } = useContext(QuizContext);

    const joinQuiz = async () => {
        setScore(0);
        try {
            const response = await axios.post(`/api/join-quiz/${sessionId}`, { name: username });
            setName(username);
            
            // Decode the questions and answer options
            if (response.data.questions) {
                response.data.questions = response.data.questions.map(question => {
                    question.question = he.decode(question.question);
                    if (question.incorrect_answers) {
                        question.incorrect_answers = question.incorrect_answers.map(answer => he.decode(answer));
                    }
                    if (question.correct_answer) {
                        question.correct_answer = he.decode(question.correct_answer);
                    }
                    return question;
                });
            }
    
            setQuestions(response.data.questions);
            setUserId(response.data.userId);
            setUuid(sessionId);
    
            const categoryObj = Categories.find(cat => cat.value === Number(response.data.category));
            setCategory(categoryObj.value);
    
            setDifficulty(response.data.difficulty);
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