

import React, {  useState } from 'react';
import './productCard.css';
// import Ranking from './Ranking';

const PizzaCard = ({ product }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-KE', {
      style: 'currency',
      currency: 'KES',
    });
  };

  return (
    <div className="productCard__wrapper">
      <div>
        <h4>{product.name}</h4>
        <span>
          <div
            className="productCard__seeMoreContainer"
            onMouseEnter={() => setShowIngredients(true)}
            onMouseLeave={() => setShowIngredients(false)}
          >
            <p className="productCard__seeMore">See ingredients...</p>
            {showIngredients && (
              <p className="productCard__ingredients">
                {product.ingredients}
              </p>
            )}
          </div>
        </span>
        <div className="ProductCard__price">
          <h5>{formatCurrency(product.price)}</h5>
        </div>
        </div>
      </div>
  );
};

export default PizzaCard;
