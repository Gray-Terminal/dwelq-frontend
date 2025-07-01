import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

// Utility to detect mobile
const isMobile = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email/password login
  const handleLoginPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/mainpage');
    } catch (err) {
      console.error('Login error:', err.code, err.message);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('User not found. Try signing up.');
          break;
        case 'auth/wrong-password':
          setError('Wrong password. Try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError(
            'Invalid credentials. Try Google login or check your details.'
          );
      }
    }
  };

  // Handle Google login (popup on desktop, redirect on mobile)
  const handleLoginGoogle = async () => {
    setError('');
    const authInstance = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      if (isMobile()) {
        setLoading(true);
        await signInWithRedirect(authInstance, provider);
      } else {
        const result = await signInWithPopup(authInstance, provider);
        const user = result.user;
        console.log('Google login successful:', user);
        navigate('/mainpage');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Try again.');
    }
  };

  // Handle redirect login result after mobile login
  useEffect(() => {
    const authInstance = getAuth();
    getRedirectResult(authInstance)
      .then((result) => {
        if (result && result.user) {
          console.log('Redirect login success:', result.user);
          navigate('/mainpage');
        }
      })
      .catch((error) => {
        console.error('Redirect login error:', error);
      });
  }, []);

  return (
    <div className='mainLogin'>
      <link
        href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap'
        rel='stylesheet'
      />
      <Link to='/' className='Logo'>
        Dwelq.
      </Link>
      <Link to='/signup' className='SignUp'>
        Sign Up
      </Link>

      <div className='realShit'>
        <h1 className='text'>Login</h1>

        <form onSubmit={handleLoginPassword} className='LoginForm'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='passwdLogin' type='submit'>
            Login
          </button>

          <button
            type='button'
            className='googleLogin'
            onClick={handleLoginGoogle}
            disabled={loading}
          >
            {loading ? 'Redirecting...' : 'Sign in with Google'}
          </button>

          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
