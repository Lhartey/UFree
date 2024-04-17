import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'; // Import the outlined user icon
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../Assets/logo.jpg';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <Link to="/">
          <h1>UFree</h1>
        </Link>
        <nav>
          {user && (
            <div className="user-info">
              <Link to="/dashboard" className="user-name">
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
                <span>{user.name}</span>
              </Link>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
