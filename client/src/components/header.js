// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { 
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser } from 'react-icons/fi';


const Header = () => {
  // const navigate = useNavigate();
  //const { useState } = useAuth();
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
    // navigate('/signin'); 
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavDropdown
          title={
            <div style={{ display: 'inline-block', color: 'silver' }}>
              <FiUser size="1.2em" />{' '}
              <span> Hi, {restaurant_name === '' ? 'User' : restaurant_name}</span>
            </div>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand>
          <Link to="/">Restaurant-Listings</Link>
        </Navbar.Brand>
        <Nav>
          <Link to="/addPizza">
            <button type="button" className="btn btn-light">
              Add Pizza
            </button>
          </Link>
          <Link to="/signin">
            <button type="button" className="btn btn-light">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button type="button" className="btn btn-light">
              Sign Up
            </button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

