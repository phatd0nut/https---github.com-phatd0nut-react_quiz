import { useState, useEffect, useRef } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import './Questions.css';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

const Questions = ({
    currentQuestion,
    setCurrentQuestion,
    questions,
    options,
    correct,
    score,
    setScore,
    theme,
    timeOut,
    setTimeOut,
    time,
    setTime
}) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const selectedRef = useRef(); // Add this line
    const timerRef = useRef(); // Add this line

    useEffect(() => {
        console.log(selectedRef.current);
        if (!selectedRef.current && time > 0 && !timeOut && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    
        return () => clearInterval(timerRef.current);
    }, [selectedRef.current, time, timeOut, currentQuestion]);

    const handleSelect = (i) => {
        if (selected === i && selected === correct) {
            return 'select';
        } else if (selected === i && selected !== correct) {
            return 'wrong';
        } else if (i === correct) {
            return 'select';
        }
    };
    const handleCheck = (i) => {
        selectedRef.current = i; // Update selectedRef.current directly
        setSelected(i);
        clearInterval(timerRef.current);
        if (i === correct) {
            setScore(score + 1);
        }
        setError(false);
    };

    const navigation = useNavigate();

    const handleNext = () => {
        if (currentQuestion > 8) {
            navigation('/result')
        } else if (selected || timeOut) {
            setCurrentQuestion(currentQuestion + 1);
            setSelected();
            setTimeOut(false);
            setTime(15);
        } else {
            setError('Please select an option first');
        }
    };

    const handleQuit = () => { };


    return (
        <div className='question'>
            <h1 className='questionCount'>Question {currentQuestion + 1}</h1>
            <LinearProgress
                className='progressBar'
                variant="determinate"
                value={(timeOut || selected) ? 0 : (time / 15) * 100}
                style={{ backgroundColor: '#FFFFFF', height: '10px' }}
            />
            <div className='singleQuestion'>
                <h2 className='questionTitle'>{questions[currentQuestion]?.question}</h2>
                <div className='options'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {
                        timeOut ? (
                            <div>The correct answer was: {correct}</div>
                        ) : (
                            options && options.map((i => (
                                <button
                                    onClick={() => handleCheck(i)}
                                    className={`singleOption ${selected && handleSelect(i)}`}
                                    key={i}
                                    disabled={selected}
                                >{i}</button>
                            )))
                        )
                    }
                </div>
                <div className='controls'>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            style={{ width: 260 }}
                            href='/'
                            onClick={handleQuit}
                        >Quit</Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            style={{ width: 260 }}
                            onClick={handleNext}
                        >Next</Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}

export default Questions