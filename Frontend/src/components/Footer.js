// Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="about-us">
        <h3>About Us</h3>
        <p>We are a team of passionate individuals dedicated to providing innovative solutions to our customers. With years of experience in the industry, we strive to deliver top-notch services and products that exceed expectations. Our mission is to make a positive impact on the world through creativity, technology, and collaboration.</p>
      </div>
      <div className="footer-info">
          <p>Ufree</p>
          <p>Address: 1st Atoom Street, Accra, Ghana</p>
          <p>Email: ufreestorage@gmail.com</p>
          <p>Phone: +233 50 432 0859</p>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
