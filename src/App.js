import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home.js';
import Quiz from './pages/Quiz.js';
import Result from './pages/Result.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState()
  const [score, setScore] = useState(0)

  const fetchQuestions = async (category = '', difficulty = '') => {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&${category && `category=${category}`}&${difficulty && `difficulty=${difficulty}`}&type=multiple`);
    console.log(data);
  }

 

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url(./soft_clouds.jpg)' }}>
        <Header className="app-header" />

        <Routes>
          <Route path="/" element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
