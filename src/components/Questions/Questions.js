import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Questions.css';

const Questions = ({
    currentQuestion,
    setCurrentQuestion,
    questions,
    setQuestions,
    options,
    correct,
    score,
    setScore
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
    }


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
                        )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Questions