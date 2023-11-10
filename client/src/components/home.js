
import React, { Fragment, useState, useEffect } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import Header from './header';
import PizzaCard from './pizzaCard'

const BASE_URL = 'http://localhost:5000/'

function Home() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/get_pizzas`)
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        console.log(data);
      });
  }, []);

  return (
    <Fragment>
        <Header />
        <h2>Restaurant-Listings</h2>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div className="products__wrapper">
            {pizzas.map((pizza, index) => (
                <PizzaCard key={index} product={pizza}/>
                ))}
            </div>
        </div>
        <SignIn/>
        <SignUp/>
    </Fragment>
  );
}

export default Home;

