

// // import React from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { useForm } from 'react-hook-form';
// // import './signIn_signUp.css';

// // const SignIn = () => {
// //   const { signIn } = useAuth();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const onSubmit = async ({ email, password }) => {
// //     try {
// // //       await signIn(email, password);
// // //     } catch (error) {
// // //       console.error('Sign In Error:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-wrapper">
// // //       <div className="auth-inner">
// // //         <form onSubmit={handleSubmit(onSubmit)}>
// // //           <h3>Sign In</h3>
// // //           <div className="mb-3">
// // //             <label>Email address</label>
// // //             <input
// // //               type="email"
// // //               className="form-control"
// // //               placeholder="Enter email"
// // //               {...register('email', { required: 'Email is required' })}
// // //             />
// // //             {errors.email && <p>{errors.email.message}</p>}
// // //           </div>
// // //           <div className="mb-3">
// // //             <label>Password</label>
// // //             <input
// // //               type="password"
// // //               className="form-control"
// // //               placeholder="Enter password"
// // //               {...register('password', { required: 'Password is required' })}
// // //             />
// // //             {errors.password && <p>{errors.password.message}</p>}
// // //           </div>
// // //           <div className="d-grid">
// // //             <button type="submit" className="btn btn-primary">
// // //               Submit
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SignIn;

// // import React from 'react';
// // import {
// //   MDBContainer,
// //   MDBInput,
// //   MDBCheckbox,
// //   MDBBtn,
// //   MDBIcon
// // }
// // from 'mdb-react-ui-kit';

// // function SignIn() {
// //   return (
// //     <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

// //       <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
// //       <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

// //       <div className="d-flex justify-content-between mx-3 mb-4">
// //         <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
// //         <a href="!#">Forgot password?</a>
// //       </div>

// //       <MDBBtn className="mb-4">Login</MDBBtn>

// //       <div className="text-center">
// //         <p>Not a member? <a href="/signUp">Register</a></p>
// //         <p>or sign up with:</p>

// //         <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
// //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
// //             <MDBIcon fab icon='facebook-f' size="sm"/>
// //           </MDBBtn>

// //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
// //             <MDBIcon fab icon='twitter' size="sm"/>
// //           </MDBBtn>

// //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
// //             <MDBIcon fab icon='google' size="sm"/>
// //           </MDBBtn>

// //           {/* <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
// //             <MDBIcon fab icon='github' size="sm"/>
// //           </MDBBtn> */}

// //         </div>
// //       </div>

// //     </MDBContainer>
// //   );
// // }

// // export default SignIn;
// import httpClient from "./httpClient";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// function LoginPage(){
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [isSignUp, seIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })
//   const [errorMessage, setErrorMessage] = useState(' ');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate()

//   const handleSuccessfullLogin = () => {
//     alert('Login successful!');
//     setErrorMessage(' ')
//     setIsLoggedIn(true);
//     navigate('/displayPage');

//     const handleSubmit = async () => {
//       if (isSignIn) {
//         const response = await fetch('http://localhost:80/signin',{
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.setEmail,
//           password: formData.password,
//         }),
//       });
//       if (response.status === 200){
//         handleSuccessfullLogin();
//       } else{
//         const data = await response.json();
//         setErrorMessage(data.message);
//       }
//     }
//   }

//   // const logInUser = async () => {
//   //   console.log(email, password);

//   //   try {
//   //     const response = await httpClient.post("//localhost:80/signin", {
//   //       email,
//   //       password,
//   //     });
//   //     if(response && response.status === 200){
//   //       window.location.href = "/";
//   //     } else {
//   //       alert("An error occurred while logging in")
//   //     }
       
//   //   } catch (error) {
//   //     if (error.response && error.response.status === 200) {
//   //       alert("Invalid credentials");
//   //     }
//   //   }
//   // };
//   return(
//     <div>
//     <form>
//       <div>
//         <label>Email: </label>
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password: </label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button type="button" onClick={() => logInUser()}>
//         Submit
//       </button>
//     </form>
//   </div>
//   )}
//   }
// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css';

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    restaurantname: '',
    email: '',
    password: '',

  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Initialize useNavigate

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
    // Reset form data when switching between login and signup
    setFormData({
      restaurantname: '',
      email: '',
      password: '',
    });
  };

  const handleSuccessfulLogin = () => {
    alert('Login successful!');
    setErrorMessage('');
    setIsLoggedIn(true); 
   
    navigate('/displayPage');
  };

  const handleSubmit = async () => {
    if (isSignUp) {
      // User sign-up
      const response = await fetch('http://localhost:80/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantname: formData.restaurantname,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 200) {
        // Registration successful
        alert('Successful signup! Please log in.');
        setErrorMessage('');
        // Reset the form after successful signup
        setFormData({
          restaurantname: '',
          email: '',
          password: '',
        });
      } else {
        // Handle registration error
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } else {
      // User login
      const response = await fetch('http://localhost:80/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 200) {
        // Call the function to handle successful login
        handleSuccessfulLogin();
      } else {
        // Handle login error
        const data = await response.json();
        setErrorMessage(data.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div id="login-signup" className={`cont ${isSignUp ? 's--signup' : ''}`}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form sign-in">
          <h2>Slice to see you again</h2>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="button" className="submit" onClick={handleSubmit}>
            Sign In
          </button>
          <h4 id="call_action">Don't have an account? Dough not worry.Sign up!</h4>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className={`img__text ${isSignUp ? 'm--up' : 'm--in'}`}>
              <h3>
                {isSignUp
                  ? "Don't have an account? Dough not worry.Sign up!"
                  : 'Already have an account?That\s grate just sign in.'}
              </h3>
            </div>
            <div className="img__btn" onClick={handleToggleForm}>
             <span className={`m--up ${isSignUp ? 'hidden' : ''}`}> Sign Up </span>
             <span className={`m--in ${isSignUp ? 'hidden' : ''}`}> Sign In </span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Create your Account</h2>
            <h4 id="call_action">Already have an account?That's grate just sign in..</h4>
            <label>
              <span> Restaurant Name</span>
              <input type="text" name="restaurantname" value={formData.restaurantname} onChange={handleChange} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              <span>Password</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <button type="button" className="submit" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
