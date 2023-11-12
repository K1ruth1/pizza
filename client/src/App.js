// // import React from 'react';
// // import './App.css';
// //  import Header from './components/header';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // // import Home from './components/home';
// // // import SignIn from './components/signIn';
// // // import SignUp from './components/signUp';
// import Home from './components/home';
// import LoginPage from './components/Login';

//  function App() {
//    return (
    
//         <div className="App">
//          <Home/>
//          <LoginPage/>
//           {/* <SignIn/>
//           <Routes>
//           <Route path="/" element={<Home />} />
//            <Route path="/" element={<SignIn />} />
//            <Route path="/signup" element={<SignUp />} />
//          </Routes> */}
//        </div>
  
//   );
//  }
//  export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
import LoginForm from './components/Login';
// import Footer from './components/footer';
// import Cart from './components/Cart';
// import HomePage from './components/home';
import DisplayCard from './components/displayPage';
import AddPizzaForm from './components/addPizza';
// import Header from './components/header'

function App() {

  

  return (
    <div>
        {/* <Header/> */}
    <Router>
     
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LoginForm />} />
        
    
    
        <Route
          path="/displayPage"
          element={<DisplayCard />}
        />
        <Route
          path="/addpizza"
          element={<AddPizzaForm />}
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App;

