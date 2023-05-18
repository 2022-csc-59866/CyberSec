import React from 'react';
import './HeroSection.css';
import '../App.css';

function AboutUs() {
  return (
    <div className='hero-container'>
      <div className='video-wrapper'>
        <div className='fixed-video'>
          <video src='./videos/Demoday.mp4' autoPlay loop muted className='video' />
          
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
