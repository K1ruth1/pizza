import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { FiUser } from 'react-icons/fi';
import AddPizzaForm from './addPizza';


const Header = () => {
  const navigate = useNavigate();
//   const { useState } = useAuth();
  const [restaurant_name, setRestaurant_name] = useState('');

  useEffect(() => {
    if (localStorage.getItem('restaurant_name') !== null) {
      const userInStorage = localStorage.getItem('restaurant_name');
      const userObj = JSON.parse(userInStorage);
      const storedUserName = userObj.first_name;
      setRestaurant_name(storedUserName);
    }
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem('restaurant_name');
    setRestaurant_name('');
    navigate('/'); 
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">Pizzaverse</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="/">Login</Nav.Link>
          <Nav.Link href="/">Sign up</Nav.Link> */}
          <NavDropdown title="Options" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/addpizza" >Add Pizza</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* <Nav>
          <Nav.Link eventKey={2} href="#memes">
            Pizzaria
          </Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Container>
  </Navbar>
    // <Navbar bg="dark" variant="dark">
    //     <NavDropdown
    //       title={
    //         <div style={{ display: 'inline-block', color: 'silver' }}>
    //           <FiUser size="1.2em" />{' '}
    //           <span> Hi, {restaurant_name === '' ? 'User' : restaurant_name}</span>
    //         </div>
    //       }
    //       id="basic-nav-dropdown"
    //     >
    //       <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //       <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
    //     </NavDropdown>
    //     <Navbar.Brand>
    //       <Link to="/">Restaurant-Listings</Link>
    //     </Navbar.Brand>
    //     <Nav>
    //       {/* <Link to="/addPizza">
    //         <button type="button" className="btn btn-light">
    //           Add Pizza
    //         </button>
    //       </Link> */}
    //       <Link to="/signin">

    //         <button type="button" className="btn btn-light">
    //           Sign In
    //         </button>
    //       </Link>
    //       <Link to="/signup">
    //         <button type="button" className="btn btn-light">
    //           Sign Up
    //         </button>
    //       </Link>
    //     </Nav>
    
    // </Navbar>
  );
};

export default Header;