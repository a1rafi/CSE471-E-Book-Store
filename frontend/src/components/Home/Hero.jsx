import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-0 -mt-9"> {/* Adjusted margin here */}
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="mb-4 text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Discover Your Next Page Turner
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
        Uncover captivating stories , enrich knowledge , and endless inspiration in our curated collection of book
        </p>
        <div className="mt-8">
          <Link 
            to="/AllBooks"
            className="mt-3 text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-4/6 h-auto flex justify-center mt-8 md:mt-0">
        <img src="./book.jpg" alt="hero" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
// h
export default Hero;