
// // import React, { Fragment, useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import SignIn from './signIn';
// // import SignUp from './signUp';
// // import Header from './header';
// // import PizzaList from './pizzaList';
// // import AddPizzaForm from './addPizza';

// // const BASE_URL = 'http://localhost:80/'

// // function Home() {
// //   const [pizzas, setPizzas] = useState([]);

// //   // useEffect(() => {
// //   //   fetch(`${BASE_URL}/get_pizzas`)
// //   //     .then((response) => response.json())
// //   //     .then((data) => {
// //   //       setPizzas(data);
// //   //       console.log(data);
// //   //     });
// //   // }, []);

// //   return (
// //     <Fragment>
// //         <Header />
// //         <h2>Restaurant-Listings</h2>
// //         <AddPizzaForm />
// //         <PizzaList/>
// //         {/* <SignIn/>
// //         <SignUp/> */}
// //     </Fragment>
// //   );
// // }

// // export default Home;

import React from "react";
import httpClient from "./httpClient";
import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import PizzaList from "./displayPage";
import LoginForm from "./Login";



function Home(){
  const [restaurant, setRestaurant] = useState([
    {restaurantname: " "},
    {email:" "},

  ]);
  const logoutUser = async () => {
    await httpClient.post("//localhost:80/signin");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:80/signin");
        setRestaurant(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      <h1>Pizza Consortium</h1>
      {restaurant != null ? (
        <div>
          <h2>Logged in</h2>
          <h3>ID: {restaurant.restaurantname}</h3>
          <h3>Email: {restaurant.email}</h3>
          <LoginForm/>
          {/* <a href="/diplayPage">
              <button>Pizza</button>
            </a> */}

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
  
  

 
};

export default Home
// import React from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
// import './home.css';

// function HomePage() {
//   return (
//     <div>
//       <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
//         <ol className="carousel-indicators ">
//           <li data-bs-target="#carouselExampleCaptions " data-bs-slide-to="0" className="active "></li>
//           <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
//           <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></li>
//         </ol>
//         <div className="carousel-inner">
//           <div className="carousel-item active ">
//             <img src="https://images.pexels.com/photos/16890470/pexels-photo-16890470/free-photo-of-pizza-on-a-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=1600" className="d-block w-100" alt="Image 1" />
//             <div className="carousel-caption d-none d-md-block">
//               <h5 id="couresl_top" >Organic <span  id="sub_headers">Pizza</span> For <span  id="sub_headers">Healthy Life</span></h5>
//                <a id="courasel_shop" href="#" className="btn btn-warning">Shop</a>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img src="https://media.istockphoto.com/id/1167509548/photo/close-up-side-profile-view-photo-he-him-his-guy-videogame-talk-headset-microphone-teammates.jpg?s=612x612&w=is&k=20&c=CxX8-Y7O0aCM7Dn6M5DshxHSYf5rxsnPCWhIXWnFwT4=" className="d-block w-100" alt="Image 2" />
//             <div className="carousel-caption d-none d-md-block">
//               <h5 id="couresl_top">Natural<span id="sub_headers">Food </span> For <span id="sub_headers">Body</span></h5>
//                <a id="courasel_shop" href="#" className="btn btn-warning">Shop</a>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img src="https://images.pexels.com/photos/5902971/pexels-photo-5902971.jpeg?auto=compress&cs=tinysrgb&w=1600" className="d-block w-100" alt="Image 3" />
//             <div className="carousel-caption d-none d-md-block">
//               <h5 id="couresl_top">From Our <span id="sub_headers">Kitchen </span> to Your <span id="sub_headers">Table</span></h5>
//                <a id="courasel_shop" href="#" className="btn btn-warning">Shop</a>
//             </div>
//           </div>
//         </div>
//         <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon btn btn-warning" aria-hidden="true"></span>
//           <span className="visually-hidden btn btn-warning">Previous</span>
//         </a>
//         <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
//           <span className="carousel-control-next-icon btn btn-warning" aria-hidden="true"></span>
//           <span className="visually-hidden btn btn-warning">Next</span>
//         </a>
//       </div>
//       <div className='about-us'>
//         <h2 id="sub_heads"> ABOUT <span id="sub_headers">Us</span> </h2>
//         {/* Content related to pizza */}
//       </div>
//       {/* Rest of the code remains the same */}
//     </div>
//   );
// }

// export default HomePage;
