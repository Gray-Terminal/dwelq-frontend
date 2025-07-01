import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"/>
      <Link to="/" className="Logo">Dwelq.</Link>
      <div className="about-container">
        <h1>About Dwelq</h1>
        <p>Dwelq is a productivity tool designed to keep your focus sharp, your screen time balanced, and your sessions organized — all in one dark, minimal, no-BS interface.</p>
        <ul>
          <li>🎯 Pomodoro, 20-20-20, Stopwatch modes</li>
          <li>⭐ Bookmark subjects & chapters you're working on</li>
          <li>📊 Dashboard to reflect your study effort</li>
        </ul>
        <p className="quote">"Don’t just study hard. Study smart. Dwelq smart."</p>
      </div>
    </div>
  );
};

export default About;
