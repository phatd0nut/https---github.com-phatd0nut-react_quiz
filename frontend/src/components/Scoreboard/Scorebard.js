import React from 'react';
import './Scoreboard.css';
import Categories from '../../data/Categories.js'

const Scoreboard = ({ players, category, difficulty }) => {
  const getCategoryName = (value) => {
    const category = Categories.find(cat => cat.value === value);
    return category ? category.category : 'Unknown';
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div id='scoreboard'>
      <h2 id='scoreboardH2'>Scoreboard</h2>
      <div id='scoreboardInfo'>
        <p>Category: {getCategoryName(category)}</p>
        <p>Difficulty: {capitalizeFirstLetter(difficulty)}</p>
      </div>
      <ul>
      {players.sort((a, b) => b.score - a.score).map((player, index) => (
  <li key={index}>{index + 1}. {capitalizeFirstLetter(player.username)} (<strong>{player.score}p</strong>)</li>
))}
      </ul>
    </div>
  );
};

export default Scoreboard;