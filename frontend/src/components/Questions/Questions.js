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
    setAnswered,
    theme,
}) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [time, setTime] = useState(15); // Add this line
    const [timeOut, setTimeOut] = useState(false); // Add this line
    const selectedRef = useRef();
    const timerRef = useRef();
    const timeRef = useRef(time);

    useEffect(() => {
        timeRef.current = time; // Add this line
    }, [time]);

    useEffect(() => {
        if (time > 0 && !timeOut) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            timerRef.current = null;
            if (!selected) {
                setTimeout(() => {
                    setSelected(correct);
                    setTimeOut(true);
                }, 1000);
            }
        }
    
        return () => clearInterval(timerRef.current);
    }, [time, timeOut, correct, selected]);

    useEffect(() => {
        setTime(15);
        setTimeOut(false);
    }, [currentQuestion]);

    const handleSelect = (i) => {
        if (selected === i && selected === correct) {
            return 'correct';
        } else if (selected === i && selected !== correct) {
            return 'wrong';
        } else if (i === correct && (timeOut || selected !== correct)) {
            return 'correct';
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
        setAnswered(true); // Add this line
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
            setAnswered(false);
            selectedRef.current = null;
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
                        options && options.map((i => (
                            <button
                                onClick={() => handleCheck(i)}
                                className={`singleOption ${selected && handleSelect(i)}`}
                                key={i}
                                disabled={selected}
                            >{i}</button>
                        )))
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