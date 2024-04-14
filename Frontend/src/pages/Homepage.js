import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCamera, faCode, faLanguage, faPen, faFileAlt, faPaintBrush, faCog, faUsers, faPercentage } from '@fortawesome/free-solid-svg-icons';
import '../styles/Homepage.css';


const categories = [
  { name: "Copywriting", icon: faPen },
  { name: "Photography", icon: faCamera },
  { name: "Web Development", icon: faLaptopCode },
  { name: "Programming", icon: faCode },
  { name: "Data Entry", icon: faFileAlt },
  { name: "Graphic Designing", icon: faPaintBrush },
  { name: "Accounting", icon: faPercentage },
  { name: "Language translation", icon: faLanguage },
  { name: "Creative Designing", icon: faUsers },
  { name: "Other", icon: faCog },
];

function HomePage() {
  return (
    <div className="home-page">
      <nav className='second-navbar'>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/about-us" className="nav-link">
          About Us
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/Feedbacks" className="nav-link">
          Feedback
        </Link>
      </nav>
      <section className="hero">
        <h2>Find the Perfect Freelancer or Get Your Project Done</h2>
        <div className="hero-buttons">
        <Link to="/available-gigs" className="btn btn-primary">
            Become a Freelancer
          </Link>
          <Link to="/post-project" className="btn btn-secondary">
            Post a Project
          </Link>
        </div>
      </section>

      <section className="categories">
        <h3> Categories</h3>
        <div className="category-list">
        <section className="categories">
        <div className="category-list">
          {categories.map((category, index) => (
            <Link to={`/category/${category.name}`} key={index} className="category">
              <FontAwesomeIcon icon={category.icon} className="category-icon" />
              <span className="category-name">{category.name}</span>
            </Link>
            ))}
            </div>
      </section>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>How it Works</h2>
        <p>UFree is a comprehensive web application tailored specifically for the university community, offering a range of features to enhance user experience and facilitate collaboration. Here's how UFree works:

User Management: UFree simplifies the registration process with streamlined procedures. Users, including students, employers, and administrators, can easily create profiles and access the platform through secure login functionalities.

Project Management: The platform provides a robust project management system, allowing users to list, search, and bid on projects. Project descriptions are detailed, including information such as budget ranges and deadlines, enabling users to make informed decisions and effectively manage their projects.

Communication Tools: UFree facilitates seamless communication and collaboration between students and employers through secure messaging systems. This enables project stakeholders to communicate effectively, share updates, and collaborate on tasks in real-time, enhancing project efficiency and productivity.

Feedback Mechanisms: The platform incorporates robust feedback mechanisms, allowing users to provide ratings and reviews for completed projects. This feedback enables project evaluation and helps build reputations for both students and employers, fostering trust and accountability within the community.

Resource Library: UFree features a curated resource library designed to support student success. This library includes career guidance resources, skill development materials, and additional resources aimed at helping users enhance their skills, expand their knowledge, and achieve their academic and professional goals.</p>
      </section>

      {/* Featured Freelancers Section */}
      <section className="featured-freelancers">
        <h2>Featured Freelancers</h2>
        {/* Display profiles of a few top-rated freelancers */}
      </section>

      {/* Testimonials Section */}
      <section className="library">
        <h2>Resource Library</h2>
        <div>
      <a href="https://www.carligh.org/index.php/2018-08-31-11-06-56/electronic-resources" target="_blank" rel="noopener noreferrer">
        Student Learaning Resources
      </a>
    </div>
      </section>
    </div>
  );
}

export default HomePage;
