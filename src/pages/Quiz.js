import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Quiz.css';
import Questions from '../components/Questions/Questions';

const Quiz = ({ name, score, questions, setScore, theme }) => {

    const [options, setOptions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timer, setTimer] = useState(null); // Define timer and setTimer here
    const [answered, setAnswered] = useState(false); // New state variable to track if the user has answered
    const [timeOut, setTimeOut] = useState(false); // New state variable to track if the time is out
    const [time, setTime] = useState(15); // New state variable to track the time


    useEffect(() => {
        setOptions(questions && handleShuffle([questions[currentQuestion]?.correct_answer, ...questions[currentQuestion]?.incorrect_answers]));

    }, [questions, currentQuestion]);

    useEffect(() => {
        let timer;

        if (answered) {
            timer = setTimeout(() => {
                setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                setAnswered(false);
                setTimeOut(false);
                setTime(15); // Reset time
            }, 3000);
        } else {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
                if (time === 0) {
                    setTimeOut(true);
                }
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [currentQuestion, answered, timeOut, time]);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    // Clear the timer when the component is unmounted
    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, [timer]);

    return (
        <div className='quiz'>
            <span className='subtitle'>Welcome {name}</span>

            {questions ? (
                <>
                    <div className='quizInfo'>
                        <span>{questions[currentQuestion].category}</span>
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
                        timeOut={timeOut} // Pass the timeOut state to the Questions component
                        setTimeOut={setTimeOut} // Pass the setTime
                        theme={theme}
                        time={time}
                        setTime={setTime} />
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