import React from 'react';
import '../App.css';
import { Button } from './Button';

function HeroSection() {
  return (
    <div className='hero-container'>
        <video src='./videos/video-2.mp4' autoPlay loop muted />
        <h1>CyberTEch</h1>
        <p>The Bridge between you and Cybersecurity</p>
        <div className="hero-btns" >
           <Button 
            className='btns' 
            buttonStyle='btn--outline'
            buttonSize='btn--large'>
            Start Now
            </Button> 

            <Button 
            className='btns' 
            buttonStyle='btn--primary'
            buttonSize='btn--large'>
            Sign Up <i className='far fa-play-circle' />
            </Button> 
        </div>
    </div>

    
  );
}

export default HeroSection;