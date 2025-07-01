import React from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <Link to="/" className="Logo">Dwelq.</Link>
      <div className="help-container">
        <h1>Need Help?</h1>
        <p>Here's a quick guide to get the most out of Dwelq.</p>

        <ul>
          <li><strong>Pomodoro:</strong> 25 min focus, 5 min break auto-looping timer.</li>
          <li><strong>20-20-20:</strong> Work 20 mins, look 20 ft away for 20 secs to reduce eye strain.</li>
          <li><strong>Stopwatch:</strong> A basic timer for flexible sessions.</li>
          <li><strong>Bookmarks:</strong> Use ⭐ to save subjects/topics while studying.</li>
          <li><strong>Focus Panel:</strong> Shows your active bookmarks.</li>
        </ul>

        <p>If something breaks, cry first — then refresh. Or contact the dev.</p>
      </div>
    </div>
  );
};

export default Help;
