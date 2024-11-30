import React from 'react';

function Hero() {
  return (
    <div className="h-[75vh] relative bg-zinc-900">
      {/* Content Section */}
      <div className="absolute top-20 left-0 p-8 z-10">
        <h1 className="text-5xl font-semibold text-yellow-100 mb-4">
          Explore, Discover, Enrich
        </h1>
        <p className="text-xl text-zinc-300 mb-6">
          Explore the world of books, discover new thoughts, and enrich your mind with endless knowledge.
        </p>
        
        <button className="text-white text-lg font-semibold border-2 border-yellow-100 px-3 py-1 hover:bg-zinc-400 rounded-xl cursor-pointer transition duration-100">
          Discover Books
        </button>
      </div>
      
      {/* Image Section */}
      <div className="absolute top-0 right-0 w-full h-full">
        <img src="./book.jpg" alt="hero" className="w-full h-full object-cover opacity-40" />
      </div>
    </div>
  );
}

export default Hero;
