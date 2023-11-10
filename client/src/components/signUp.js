

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './signIn_signUp.css';

const BASE_URL ='http://localhost:5000/'

const SignUp = () => {
  const { wekaUser } = useAuth();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');
  const [email, setEmail] = useState('');
  const [number,setNumber] = useState('')
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const signData = {
      restaurant_name: restaurantName,
      restaurant_image: restaurantImage,
      email: email,
      number: number,
      password: password,
    };
    fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signData),
    })
      .then((res) => {
        if (!res.ok) {
          alert('Failed');
        } else {
          localStorage.setItem('user', JSON.stringify(signData));
        }
        return res.json();
      })
      .then((data) => {
        wekaUser(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Restaurant name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Restaurant Image</label>
            <input
              type="text"
              className="form-control"
              placeholder="Restaurant image"
              value={restaurantImage}
              onChange={(e) => setRestaurantImage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Phone number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
