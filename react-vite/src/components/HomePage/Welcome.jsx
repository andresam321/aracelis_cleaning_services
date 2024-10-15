import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  // const handleBooking = () => {
  //   navigate('/Services'); 
  // }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="welcome-container">
      <img 
        src="https://res.cloudinary.com/djuzk5um3/image/upload/v1726714544/Screenshot_2024-09-17_at_8.07.42_PM_ekmf1w.png" 
        alt="Background" 
        className="background-image" 
      />
      
      <div className="content">
        <h1>Araceli's Cleaning Services</h1>
        <p>Reliable, professional cleaning for homes, offices, and more in the Bay Area CA.</p>
        <p>Call or text today to schedule your cleaning!</p>
        <button className="book-now-btn">Call Now: 510-779-4414</button>
        <button className="book-now-btn">Email Us: araceliclean@gmail.com</button>
      </div>
    </div>
  );
}



export default Welcome;