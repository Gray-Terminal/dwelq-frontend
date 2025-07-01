import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';

const SideBar = ({ mode, setMode }) => {
  return (
    <div className="sidebar">
      <button onClick={() => setMode('pomodoro')}>Pomodoro</button>
      <button onClick={() => setMode('202020')}>20-20-20</button>
      <button onClick={() => setMode('stopwatch')}>Stopwatch</button>
    </div>
  );
};

const Timer = ({ mode }) => {
  const [timeLeft, setTimeLeft] = useState(1500); // default for pomodoro
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState("focus");
  const [twentyPhase, setTwentyPhase] = useState("work");

  // ⏱️ Timer engine
  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (mode === 'stopwatch') {
          setTimeLeft(prev => prev + 1);
        } else {
          setTimeLeft(prev => Math.max(prev - 1, 0));
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  // 🔁 Auto-cycle for Pomodoro & 20-20-20 (NOT for Stopwatch)
  useEffect(() => {
    if (mode === "stopwatch" || !isRunning || timeLeft !== 0) return;

    if (mode === "pomodoro") {
      if (pomodoroPhase === "focus") {
        setPomodoroPhase("focus-alarm");
        setTimeLeft(60); // 1 minute alarm
        setIsRunning(true);
      } else if (pomodoroPhase === "focus-alarm") {
        setPomodoroPhase("break");
        setTimeLeft(300); // 5 minute break
        setIsRunning(true);
      } else if (pomodoroPhase === "break") {
        setPomodoroPhase("break-alarm");
        setTimeLeft(60); // 1 minute alarm
        setIsRunning(true);
      } else if (pomodoroPhase === "break-alarm") {
        setPomodoroPhase("focus");
        setTimeLeft(1500); // back to work
        setIsRunning(true);
      }
    }

    if (mode === "202020") {
      if (twentyPhase === "work") {
        setTwentyPhase("rest");
        setTimeLeft(20);
        setIsRunning(true);
      } else if (twentyPhase === "rest") {
        setTwentyPhase("work");
        setTimeLeft(1200);
        setIsRunning(true);
      }
    }
  }, [timeLeft, isRunning, mode, pomodoroPhase, twentyPhase]);

  // 🔄 Reset things when mode changes
  useEffect(() => {
    if (mode === "pomodoro") {
      setPomodoroPhase("focus");
      setTimeLeft(1500);
    } else if (mode === "202020") {
      setTwentyPhase("work");
      setTimeLeft(1200);
    } else if (mode === "stopwatch") {
      setTimeLeft(0);
    }
    setIsRunning(false);
  }, [mode]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const displayTitle = () => {
    if (mode === "pomodoro") {
      if (pomodoroPhase === "focus") return "Focus Time";
      if (pomodoroPhase === "focus-alarm") return "Take a Break!";
      if (pomodoroPhase === "break") return "Break Time";
      if (pomodoroPhase === "break-alarm") return "Back to Work!";
    }

    if (mode === "202020") {
      return twentyPhase === "work" ? "20 Min Focus" : "20 Sec Eye Break";
    }

    return "Stopwatch";
  };

  return (
    <div className="timer">
      <h2>{displayTitle()}</h2>
      <h1>{formatTime(timeLeft)}</h1>

      <button onClick={() => setIsRunning(prev => !prev)}>
        {isRunning ? "Pause" : "Start"}
      </button>

      {mode === "pomodoro" && (
        <button onClick={() => {
          setIsRunning(false);
          setPomodoroPhase("focus");
          setTimeLeft(1500);
        }}>
          End Pomodoro Cycle
        </button>
      )}

      {mode === "202020" && (
        <button onClick={() => {
          setIsRunning(false);
          setTwentyPhase("work");
          setTimeLeft(1200);
        }}>
          End 20-20-20 Cycle
        </button>
      )}

      {mode === "stopwatch" && (
        <button onClick={() => {
          setIsRunning(false);
          setTimeLeft(0);
        }}>
          Reset Stopwatch
        </button>
      )}
    </div>
  );
};



const FocusPanel = ({ bookmarks, removeBookmark }) => {
  return (
    <div className="focus-panel">
      <h3>Bookmarks</h3>
      <ul>
        {bookmarks.map((b, i) => (
          <li key={i}>
            {b.subject} - {b.chapter}
            <button onClick={() => removeBookmark(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainPage = () => {
  const [mode, setMode] = useState('pomodoro');
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("dwelq_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("dwelq_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = () => {
    const subject = prompt("Enter subject name:");
    const chapter = prompt("Enter chapter/topic:");
    if (subject && chapter) {
      setBookmarks(prev => [...prev, { subject, chapter }]);
    }
  };

  const removeBookmark = (index) => {
    setBookmarks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='main-container'>
      <div className='top-nav'>
  <div className="nav-left">
     <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"/>
    <Link to="/" className="Logo">Dwelq.</Link>
  </div>
  <div className="nav-right">
    <button className="icon" onClick={addBookmark}>⭐</button>
  </div>
</div>

      <div className='body-content'>
        <SideBar mode={mode} setMode={setMode} />
        <Timer mode={mode} />
        <FocusPanel bookmarks={bookmarks} removeBookmark={removeBookmark} />
      </div>
    </div>
  );
};

export default MainPage;
