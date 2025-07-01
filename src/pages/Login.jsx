// src/Login.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          navigate("/mainpage");
        }
      })
      .catch((err) => {
        console.error("Redirect login error", err);
        setError("Google Login failed.");
      });
  }, []);

  const handleLoginPswd = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/mainpage");
    } catch (err) {
      console.error("Login error:", err.code, err.message);
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found. Try signing up.");
          break;
        case "auth/wrong-password":
          setError("Wrong password. Try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError("Login failed. Try again or use Google.");
      }
    }
  };

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
        navigate("/mainpage");
      }
    } catch (err) {
      console.error("Google Sign-In error:", err.message);
      setError("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className='mainLogin'>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"/>
      <Link to="/" className="Logo">Dwelq.</Link>
      <Link to="/signup" className='SignUp'>Sign Up</Link>

      <div className='realShit'>
        <h1 className='text'>Login</h1>
        <form onSubmit={handleLoginPswd} className="LoginForm">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className='passwdLogin' type="submit">Login</button>
          <button className='googleLogin' type="button" onClick={handleLoginGoogle}>
            Sign in with Google
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
