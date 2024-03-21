import { useState, useEffect } from 'react';
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
    console.log(questions);
    console.log(currentQuestion);
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

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
        setSelected(i);
        if (i === correct) {
            setScore(score + 1);
        }
        setError(false);
    };

    const navigation = useNavigate();

    const handleNext = () => {
        if (currentQuestion > 8) {
            navigation('/result')
        } else if (selected || timeOut) { // Add timeOut here
            setCurrentQuestion(currentQuestion + 1);
            setSelected();
            setTimeOut(false); // Reset timeOut here
            setTime(15); // Reset time here
        } else {
            setError('Please select an option first');
        }
    };

    const handleQuit = () => { };

    useEffect(() => {
        console.log('time', time);
        // This will run every time `time` changes
    }, [time]);



    return (
        <div className='question'>
            <h1 className='questionCount'>Question {currentQuestion + 1}</h1>
            <LinearProgress
                className='progressBar'
                variant="determinate"
                value={(time / 15) * 100}
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