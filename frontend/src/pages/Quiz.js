import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Quiz.css';
import Questions from '../components/Questions/Questions.js';

const Quiz = ({ name, score, questions, setScore, theme }) => {

    const [options, setOptions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answered, setAnswered] = useState(false); // New state variable to track if the user has answered

    useEffect(() => {
        if (questions && questions[currentQuestion] && Array.isArray(questions[currentQuestion].incorrect_answers)) {
            setOptions(handleShuffle([questions[currentQuestion].correct_answer, ...questions[currentQuestion].incorrect_answers]));
        }
    }, [questions, currentQuestion]);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    return (
        <div className='quiz'>
            <span className='subtitle'>Welcome {name}</span>

            {questions ? (
                <>
                    <div className='quizInfo'>
                        <span>{questions[currentQuestion]?.category}</span>
                        <span>Score: {score}</span>

                    </div>

                    <Questions

                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        questions={questions}
                        options={options}
                        correct={questions[currentQuestion]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setAnswered={setAnswered} // Pass the setAnswered function to the Questions component
                        theme={theme} />
                </>

            ) : (
                <CircularProgress
                    style={{ margin: 100 }}
                    color='inherit'
                    size={150}
                    thickness={2}
                />
            )}


        </div>
    );

};

export default Quiz;