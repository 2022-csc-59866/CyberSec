import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import AboutUs from '../AboutUs';
import Video from '../Video';
import DataCard from '../DataCard';

function ContactUs () {
    return (
        <>
        <DataCard />
        <AboutUs />
        
        <Video />
        <Footer />
        </>

    );
}

export default ContactUs;