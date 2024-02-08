import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Questions.css';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';





const Questions = ({
    currentQuestion,
    setCurrentQuestion,
    questions,
    options,
    correct,
    score,
    setScore,
    theme
}) => {
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
        } else if (selected) {
            setCurrentQuestion(currentQuestion + 1);
            setSelected();
        } else {
            setError('Please select an option first');
        }
    };

    const handleQuit = () => {};



    return (
        <div className='question'>
            <h1 className='questionCount'>Question {currentQuestion + 1}</h1>
            <div className='singleQuestion'>
                <h2 className='questionTitle'>{questions[currentQuestion].question}</h2>
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
                        >Quit

                        </Button>

                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            style={{ width: 260 }}
                            onClick={handleNext}
                        >Next
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}

export default Questions