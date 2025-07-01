// src/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const HandelLoginPswd = async(e) =>{
  e.preventDefault();

  try{
    await signInWithEmailAndPassword(auth,email,password);
    navigate("/mainpage")
  }catch(err){
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
      setError("Invalid credentials, try logging in using Google, or try again.")
  }

  }
}

const HandelLoginGoogle = async() =>{
  const provider = new GoogleAuthProvider();
  try{
    const result = await signInWithPopup(auth, provider);
    const user = provider.user;
    console.log('Google login successful', user);
    navigate("/mainpage")
  }catch(err){
    if (err.code == "auth/user-not-found"){
    }else{
      setError(err.message)
    }
  }
}



  return (
    <div className='mainLogin'>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"/>
        <Link to="/" className="Logo">Dwelq.</Link>
        <Link to="/signup" className='SignUp'>Sign Up</Link>
        <div className='realShit'>
            <h1 className='text'>Login</h1>
            <form onSubmit={HandelLoginPswd} className="LoginForm">
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button className = 'passwdLogin' type="submit">Login</button>
              <button className= 'googleLogin' onClick={HandelLoginGoogle}>
                  Sign in with Google
              </button>
              {error && <p className="error">{error}</p>}
            </form>
        </div>
    </div>
  );
};



export default Login;
