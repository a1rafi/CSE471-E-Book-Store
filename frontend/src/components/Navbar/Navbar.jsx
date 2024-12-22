import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("all");
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams({ searchTerm, language }).toString();
    navigate(`/search?${queryParams}`);
  };

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/AllBooks" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/admin-profile" },
    { title: "Articles", link: "/articles" },
  ];

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn ?? false);
  const role = useSelector((state) => state.auth?.role ?? false);

  // Filter links based on authentication and user role
  const filteredLinks = links.filter((link) => {
    if (!isLoggedIn && (link.title === "Cart" || link.title === "Profile" || link.title === "Admin Profile")) {
      return false;
    }
    if (isLoggedIn && role === "user" && link.title === "Admin Profile") {
      return false;
    }
    if (isLoggedIn && role === "admin" && link.title === "Profile") {
      return false;
    }
    return true;
  });

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <img
              className="h-10 me-4"
              src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
              alt="logo"
            />
            <h1 className="text-2xl font-semibold">BookHeaven</h1>
          </div>
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="hidden md:flex items-center"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-b border-white text-white outline-none px-4 py-1"
          />
          <button type="submit" className="ml-2 text-blue-500">
            <FaSearch />
          </button>
        </form>

        <div className="nav-links-BookHeaven block md:flex items-center gap-4">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className={`hover:text-blue-500 transition-all duration-300 ${item.className ? item.className : ""}`}
              key={i}
            >
              {item.title}
            </Link>
          ))}

          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/Login"
                className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/Signup"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          className="text-white text-2xl hover:text-zinc-400 md:hidden"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <FaGripLines />
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 bg-zinc-800 z-40 flex flex-col items-center justify-center transition-transform duration-300 ${
          mobileNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() => setMobileNav(false)} // Close the menu when a link is clicked
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/Login"
              className="px-8 mb-8 py-2 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav(false)} // Close the menu when a link is clicked
            >
              Log In
            </Link>
            <Link
              to="/Signup"
              className="px-8 py-2 text-3xl font-semibold bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav(false)} // Close the menu when a link is clicked
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;