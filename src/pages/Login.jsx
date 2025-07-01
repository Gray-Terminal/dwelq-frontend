// src/Login.jsx
import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        console.error("Redirect login error:", err);
        setError("Google login failed. Try again.");
      });
  }, []);

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/mainpage");
    } catch (err) {
      console.error("Login error:", err.code);
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

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className='mainLogin'>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet" />
      <Link to="/" className="Logo">Dwelq.</Link>
      <Link to="/signup" className='SignUp'>Sign Up</Link>
      <div className='realShit'>
        <h1 className='text'>Login</h1>
        <form onSubmit={handleLoginWithEmail} className="LoginForm">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className='passwdLogin' type="submit">Login</button>
          <button className='googleLogin' type="button" onClick={handleLoginWithGoogle}>Sign in with Google</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
