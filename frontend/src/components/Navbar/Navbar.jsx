import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { 
      title: "Home", 
      link: "/" 
    },
    { 
      title: "All Books", 
      link: "/all-books" 
    },
    { 
      title: "Cart", 
      link: "/cart" 
    },
    { 
      title: "Profile", 
      link: "/profile" 
    },
  ];

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

  if (isLoggedIn === false) {
    links.splice(2,2);
  }
  const [MobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!MobileNav);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="z-50 relative flex bg-zinc-950 text-white px-8 py-4 items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHaven</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="hover:text-blue-400 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
          <Link
            to="/LogIn"
            className="px-4 py-1 border border-blue-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            LogIn
          </Link>
          <Link
            to="/SignUp"
            className="px-4 py-1 bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            SignUp
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-white text-2xl hover:text-zinc-400"
          onClick={toggleMobileNav}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Navigation */}
      {MobileNav && (
        <div
          className="bg-zinc-800 fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center"
        >
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="text-white text-4xl mb-8 font-semibold hover:text-blue-400 transition-all duration-300"
              key={i}
              onClick={() => setMobileNav(false)}
            >
              {item.title}
            </Link>
          ))}
          <Link
            to="/LogIn"
            className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-800 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setMobileNav(false)}
          >
            LogIn
          </Link>
          <Link
            to="/SignUp"
            className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setMobileNav(false)}
          >
            SignUp
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;