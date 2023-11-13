import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adPizza.css';
const BASE_URL ='http://localhost:80'


// const AddPizzaForm = () => {
//   const [name, setName] = useState([' ']);
//   const [amount, setAmount] = useState([' ']);
//   const [description, setDescription] = useState([' ']);
//   const [image_url, setImageUrl] = useState([' ']);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

// const pizza_types = {name, amount, image_url, description}
        

//     try {
//       const response = await fetch(`${BASE_URL}/add_pizza` ,{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(pizza_types),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Pizza added:', pizza_types);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form >
//       <label>
//         Name:
//         <input type="text" value={pizza_types.name} onChange={(e) => setName(e.target.value)} required />
//       </label>
//       <label>
//         Amount:
//         <input type="number" value={pizza_types.amount} onChange={(e) => setAmount(e.target.value)} required />
//       </label>
//       <label>
//         Image url
//         <input type="image" value={pizza_types.image_url} onChange={(e) => setImageUrl(e.target.value)} required />
//       </label>
//       <label>
//         Description:
//         <input type="text" value={pizza_types.description} onChange={(e) => setDescription(e.target.value)} required />
//       </label>
//       <button onSubmit={handleSubmit} type="submit">Add Pizza</button>
//     </form>
//   );
// };

// export default AddPizzaForm;

// const [pizza_types, setPizzaTypes] = useState({});

const AddPizzaForm = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');
    const navigate = useNavigate();
   
  
    const handleSubmit = async (event) => {
    //   event.preventDefault();
        
  
      const pizza_types = { name, amount, image_url, description };
  
      try {
        const response = await fetch(`${BASE_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pizza_types),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('Pizza added successfully!');
        navigate('/displaypage');
        console.log('Pizza added:', pizza_types);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <div class = 'topper' >ADD PIZZA</div>
        <a href="/displaypage">
              <button>Pizza List</button>
            </a>
      <form onSubmit={handleSubmit} id = 'addpizza'  >
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <label>
          Image url
          <input type="text" value={image_url} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Add Pizza</button>
      </form>
      </div>
    );
  };
  
  export default AddPizzaForm;
  
