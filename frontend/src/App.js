import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home.js';
import Quiz from './pages/Quiz.js';
import Result from './pages/Result.js';
import JoinQuiz from './pages/JoinQuiz.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@material-ui/core';

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [uuid, setUuid] = useState("");
  const [userId, setUserId] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7094A4',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#DC143C',
        contrastText: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: "Signika",
      fontSize: 20,
    },
    overrides: {
      MuiButton: {
        root: {
          fontFamily: "Signika",
        },
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header className="app-header" />

          <Routes>
            <Route path="/" element={<Home name={name} setName={setName} setQuestions={setQuestions} setUuid={setUuid} setUserId={setUserId} theme={theme} />} />
            <Route path="/quiz" element={<Quiz name={name} questions={questions} setQuestions={setQuestions} score={score} setScore={setScore} theme={theme} />} />
            <Route path="/join/:sessionId" element={<JoinQuiz setName={setName} setQuestions={setQuestions} setUuid={setUuid} setUserId={setUserId} />} />
            <Route path="/result" element={<Result name={name} score={score} uuid={uuid} userId={userId} theme={theme} />} />
          </Routes>

        </div>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;