import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const PopularBooks = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/get-books');
        const allBooks = response.data.data;

        console.log('Books received:', allBooks);

        const popularBooks = allBooks.slice(0, 4);

        console.log('Filtered Books:', popularBooks);
        setFilteredData(popularBooks);
        setData(allBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Popular Books</h4>
      {!filteredData && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredData &&
          filteredData.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularBooks;