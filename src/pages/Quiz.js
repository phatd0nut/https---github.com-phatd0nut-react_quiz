import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Quiz.css';
import Questions from '../components/Questions/Questions';

const Quiz = ({ name, score, questions, setQuestions, setScore, theme }) => {

    const [options, setOptions] = useState()
    const [currentQuestion, setCurrentQuestion] = useState(0)

    useEffect(() => {
        console.log(questions);

        setOptions(questions && handleShuffle([questions[currentQuestion]?.correct_answer, ...questions[currentQuestion]?.incorrect_answers]))

    }, [questions, currentQuestion]);

    console.log(options);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5)
    }

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
    )
}

export default Quiz