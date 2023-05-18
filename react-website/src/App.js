import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Services from './components/Pages/Services';
import ContactUs from './components/Pages/ContactUs';
import "bootstrap/dist/css/bootstrap.min.css"
import SignUp from './components/Pages/SignUp';
import Login from './components/Login';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/services" element={<Services />}/>
      <Route path="/contact-us" element={<ContactUs />}/>
      <Route path="sign-up" element={<SignUp />}/>
      <Route path="login" element={<Login />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
