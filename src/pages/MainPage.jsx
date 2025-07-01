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
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState("focus");
  const [twentyPhase, setTwentyPhase] = useState("work");

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (mode === 'stopwatch') return prev + 1;
          return Math.max(prev - 1, 0);
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return;

    setIsRunning(false); // stop timer briefly

    if (mode === "pomodoro") {
      switch (pomodoroPhase) {
        case "focus":
          setPomodoroPhase("focus-alarm");
          setTimeLeft(60); // 1 min alarm
          setIsRunning(true);
          break;
        case "focus-alarm":
          setPomodoroPhase("break");
          setTimeLeft(300); // 5 min break
          setIsRunning(true);
          break;
        case "break":
          setPomodoroPhase("break-alarm");
          setTimeLeft(60); // 1 min alarm
          setIsRunning(true);
          break;
        case "break-alarm":
          setPomodoroPhase("focus");
          setTimeLeft(1500); // restart 25 mins
          setIsRunning(true);
          break;
        default:
          break;
      }
    }

    if (mode === "202020") {
      if (twentyPhase === "work") {
        setTwentyPhase("rest");
        setTimeLeft(20);
        setIsRunning(true);
      } else {
        setTwentyPhase("work");
        setTimeLeft(1200);
        setIsRunning(true);
      }
    }
  }, [timeLeft, isRunning, mode, pomodoroPhase, twentyPhase]);

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

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const displayTitle = () => {
    if (mode === "pomodoro") {
      if (pomodoroPhase === "focus") return "Focus Time";
      if (pomodoroPhase === "focus-alarm") return "⏰ Focus Finished!";
      if (pomodoroPhase === "break") return "Break Time";
      if (pomodoroPhase === "break-alarm") return "⏰ Break Over!";
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
        <Link to="/" className="Logo">Dwelq.</Link>
        <div className="top-icons">
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
