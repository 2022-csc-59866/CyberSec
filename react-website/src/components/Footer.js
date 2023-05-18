import React, { useState } from 'react';
import { Button } from './Button';
import './Footer.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Footer() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/newsletter/subscribe', { email });
      // Handle success, e.g., show a success message
      console.log(response.data);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error(error);
    }
  };

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscrition-heading'>Join our newsletter</p>
        <p className='footer-subscrition-text'>You can unsubscribe at any time</p>
        <div className='input-areas'>
          <form onSubmit={handleSubscribe}>
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              className='footer-input'
              value={email}
              onChange={handleEmailChange}
            />
            <Button buttonStyle='btn--outline' type='submit'>
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    <div className='footer-links'>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                   <h2>Contact Us</h2>
                   <Link to='/'>Contact</Link>
                    <Link to='/'>Support</Link>
                    <Link to='/'>Destinations</Link>
                    <Link to='/'>Sponsorships</Link>
                </div>
                <div className='footer-link-items'>
                   <h2>About Us</h2>
                   <Link to='/sign-up'>How it works</Link>
                   <Link to='/'>Testimonials</Link>
                   <Link to='/'>Career</Link>
                   <Link to='/'>Job Posting</Link>
                   <Link to='/'>Partners</Link>
                   <Link to='/'>Terms of Service</Link>
                </div>
                </div>
                <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                   <h2>Join Us</h2>
                   <Link to='/'>Become a Student Cahpter</Link>
                   <Link to='/'>Become our Partner</Link>
                   <Link to='/'>Become a Mentor</Link>
                   <Link to='/'>Become a Mentee</Link>
                </div>
                <div className='footer-link-items'>
                   <h2>Social Media</h2>
                   <Link to='/'>LinkedIn</Link>
                   <Link to='/'>Instagram</Link>
            </div>
        </div>
    </div>
    
    <section className='social-media'>
        <div className='social-media-wrap'>
            <div className='footer-logo'>
                <Link to='/' className='social-logo'>
                    CyberTEch
                </Link>
            </div>
            <small className='website-rights'> Capstone Project</small>
            <div className='social-icons'>
                <Link className='social-icon-link linkedin'
                 to='/' target='_blank' 
                 arial-label='LinkedIn'>
                <i className='fab fa-linkedin-in'/>
                </Link>
                <Link className='social-icon-link instagram'
                 to='/' target='_blank' 
                 arial-label='Instagram'>
                <i className='fab fa-instagram'/>
                </Link>


            </div>
        </div>
    </section>
    </div>
  )
}

export default Footer