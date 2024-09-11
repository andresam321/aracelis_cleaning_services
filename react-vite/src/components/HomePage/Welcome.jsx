import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/Services'); // Assuming you have a booking route
  }

  return (
    <div className="welcome-container">
      <div className="hero-section">
        <h1>Welcome to Araceli's Cleaning Services</h1>
        <p>Your home deserves the best care.</p>
        <button className="book-now-btn" onClick={handleBooking}>Book Me Now</button>
      </div>
      <div className="images-grid">
        <div className="image-placeholder">Image 1 Placeholder</div>
        <div className="image-placeholder">Image 2 Placeholder</div>
        <div className="image-placeholder">Image 3 Placeholder</div>
        <div className="image-placeholder">Image 4 Placeholder</div>
      </div>
    </div>
  );
}

export default Welcome;