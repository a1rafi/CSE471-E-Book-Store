import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaGripLines } from "react-icons/fa";


function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  return (
    <div className="flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
      <Link to="/" className="flex items-center">
        <img
          className="h-10 mr-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"
        />
        <h1 className="text-2xl font-semibold">The Bibliophile's Retreat</h1>
      </Link>
      
      
      <div className="nav-links-The Bibliophile's Retreat block  md:flex items-center gap-4">
        <div className="hidden md: flex gap-4"> 
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link} 
              className="hover:text-gray-400 transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="hidden md: flex gap-4"> 
          <Link 
            to='/SignUp' 
            className="px-4 py-2 border border-blue-700 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Sign Up
          </Link>
          <Link 
            to='/LogIn' 
            className="px-4 py-2 bg-white text-zinc-800 border border-zinc-800 hover:bg-zinc-200 transition-colors duration-300"
          >
            Log In
          </Link>
        </div>
       
        
        <button className="text-white text-2xl">
            <FaGripLines /> 
        </button>
      </div>
    </div>
  );
}

export default Navbar;
