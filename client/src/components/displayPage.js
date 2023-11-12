// import React, { useEffect, useState } from 'react';
// //import axios from 'axios';
// import PizzaCard from './pizzaCard';

// const BASE_URL = 'http://localhost:80'

// const PizzaList = () => {
//   const [pizzas, setPizzas] = useState([
//     {name : ""},
//     {image_url : " "},
//     {description: " "},
//     {amount : 0}
//   ]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/pizza-types`).then((res) =>
//     res.json().then((pizza_types) =>{
//         setPizzas([
//             {name: pizza_types.name},
//             {image_url: pizza_types.image_url},
//             {description: pizza_types.description},
//             {amount: pizza_types.amount},
//         ])
//     })
      
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       })
//     )
//   }, []);

//   return (
//     <div>
//       {pizzas.map(pizza => <PizzaCard key={pizza.id} product={pizza} />)}
//     </div>
//   );
// };

// export default PizzaList;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './displayPage.css'
import Header from './header';


const DisplayCard = ({ }) => {
  const [productData, setProductData] = useState([ " " ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:80/pizza-types')
      .then((response) => response.json())
      .then((pizza_types) => {
        setProductData(pizza_types);
    
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 

  return (
    <div>
        <Header/>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {productData.map((pizza_types) => (
          <div class="col">
            <div class="card">
              <img src={pizza_types.image_url} className="card-img-top" alt="product image" />
              <div className="card-body">
                <h5 className="card-title">{pizza_types.name}</h5>
                <p className="card-text">{pizza_types.description}</p>
                <p className="card-text">{pizza_types.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default DisplayCard;