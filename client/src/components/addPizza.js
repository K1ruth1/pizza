import React, { useState } from 'react';

const AddPizzaForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const pizza = { name, price, ingredients };

    try {
      const response = await fetch('sqlite:///pizza_restaurants.db/add_Pizza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pizza),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Pizza added:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Ingredients:
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </label>
      <button type="submit">Add Pizza</button>
    </form>
  );
};

export default AddPizzaForm;
