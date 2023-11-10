import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PizzaCard from './pizzaCard';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('/api/pizzas')
      .then(response => {
        setPizzas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  return (
    <div>
      {pizzas.map(pizza => <PizzaCard key={pizza.id} product={pizza} />)}
    </div>
  );
};

export default PizzaList;