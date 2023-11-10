

// import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch(action.type){
//     case 'LOGIN':
//       localStorage.setItem('userData', JSON.stringify(action.payload));
//       return { restaurant_name: action.payload };
//     case 'LOGOUT':
//       localStorage.removeItem('userData');
//       return { restaurant_name: null };
//     default:
//       return state;
//   }
// }

// const BASE_URL = 'http://localhost:5000/'

// const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     restaurant_name: JSON.parse(localStorage.getItem('userData')),
//   });

//   const [userLoggingOut, setUserLoggingOut] = useState(false);
//   const [pizzas, setPizzas] = useState([]);



// const signIn = async (email, password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const userData = await response.json();
//       dispatch({ type: 'LOGIN', payload: userData });
//     } else {
//       if (response.status === 401) {
//         console.error('Invalid email or password');
//       } else {
//         console.error('Failed to fetch user data');
//       }
//     }
//   } catch (error) {
//     console.error('Failed to fetch user data:', error);
//   }
// };




// const signUp = async (restaurantName, email, phoneNumber, password) => {
//     try {
//       const userInfo = {
//         restaurant_name: restaurantName,
//         email: email,
//         phone_number: phoneNumber,
//         password: password,
//       };
//       const response = await fetch(`${BASE_URL}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userInfo),
//       });
  
//       if (response.ok) {
//         const userData = await response.json();
//         dispatch({ type: 'LOGIN', payload: userData });
//       } else {
//         if (response.status === 409) {
//           throw new Error('Email already in use');
//         } else {
//           throw new Error('Failed to register');
//         }
//       }
//     } catch (error) {
//       console.error('Sign-up failed:', error);
//       throw error;
//     }
//   };
  

//   const getPizzas = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/get_pizzas`, {
//         method: 'GET',
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setPizzas(data);
//       } else {
//         console.error('Failed to fetch pizzas');
//       }
//     } catch (err) {
//       console.error('Failed to fetch pizzas:', err.message);
//     }
//   };

//   useEffect(() => {
//     getPizzas();
//   }, []);

//   const signOut = () => {
//     dispatch({ type: 'LOGOUT' });
//   };

//   function userLoggedOut(h) {
//     setUserLoggingOut(h);
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         restaurant: state.restaurant_name,
//         signIn,
//         signUp,
//         signOut,
//         userLoggedOut,
//         userLoggingOut,
//         pizzas,
//         dispatch 
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export { AuthContextProvider, useAuth };
