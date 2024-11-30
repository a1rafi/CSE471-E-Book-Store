import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your AllBooks, LogIn, SignUp, Cart, and Profile components
import AllBooks from './pages/AllBooks';  // Adjust path if necessary
import LogIn from './pages/LogIn'; 
import SignUp from './pages/SignUp';      // Import SignUp component (was incorrectly named as SignIn)
import Cart from './pages/Cart';          // Import Cart component
import Profile from './pages/Profile';    // Import Profile component

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* Define the Routes properly */}
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/SignUp" element={<SignUp />} /> {/* Fixed route path to match SignUp */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
