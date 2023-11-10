

import React from 'react';
import './App.css';
//mport Header from './components/header';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
//import SignIn from './components/signIn';
//import SignUp from './components/signUp';

function App() {
  return (
    
      <div className="App">
        {/* <Header/> */}
        <Home/>
        {/* /* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes> */}
      </div>
    
  );
}

export default App;
