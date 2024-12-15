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
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn ?? false);
  const role = useSelector((state) => state.auth?.role ?? false);

  // Modify links based on authentication and user role
  if (isLoggedIn === false) {
    links.splice(2, 3); // Removes "Cart" and "Profile" if not logged in
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1); // Removes "Profile" if logged in as user
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1); // Removes "Profile" if logged in as admin
  }

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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
