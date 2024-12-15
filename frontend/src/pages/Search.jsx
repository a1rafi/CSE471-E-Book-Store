import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

const Search = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPageStart, setCurrentPageStart] = useState(0);
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBookCount, setTotalBookCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("searchTerm") || "";
  const language = queryParams.get("language") || "all";

  // Function to fetch books
  const fetchBooks = useCallback(async (query, selectedLang) => {
    if (!query) {
      setBookList([]);
      setTotalBookCount(0);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/search?searchTerm=${encodeURIComponent(
          query
        )}&language=${selectedLang}&limit=${itemsPerPage}&start=${currentPageStart}`
      );

      if (response.data.status === "Success") {
        setBookList(response.data.data);
        setTotalBookCount(response.data.total || 0);
      } else {
        setBookList([]);
        setTotalBookCount(0);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBookList([]);
      setTotalBookCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage, currentPageStart]);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedLanguage(language);
    fetchBooks(query, language);
  }, [query, language, fetchBooks]);

  useEffect(() => {
    if (searchQuery) {
      fetchBooks(searchQuery, selectedLanguage);
    }
  }, [searchQuery, selectedLanguage, fetchBooks]);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    setCurrentPageStart(0);
    fetchBooks(newSearchQuery, selectedLanguage);
  };

  // Handle language filter change
  const handleLanguageSelectionChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentPageStart(0);
    fetchBooks(searchQuery, event.target.value);
  };

  const handleNextPage = () => {
    if (currentPageStart + itemsPerPage < totalBookCount) {
      setCurrentPageStart((prev) => prev + itemsPerPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPageStart > 0) {
      setCurrentPageStart((prev) => Math.max(0, prev - itemsPerPage));
    }
  };

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      <div className="w-full md:w-64 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageSelectionChange}
            className="w-full px-2 py-1 border rounded text-black"
          >
            <option value="all">All Languages</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      <div className="flex-grow p-4">
        <input
          type="text"
          placeholder="Search for a book"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="w-full p-2 border rounded mb-4 bg-gray-800 text-white"
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <>
            {bookList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {bookList.map((book) => (
                  <div key={book._id}>
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No books found. Try a different search or filter.
              </p>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPageStart === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {Math.floor(currentPageStart / itemsPerPage) + 1} of{" "}
                {Math.ceil(totalBookCount / itemsPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPageStart + itemsPerPage >= totalBookCount}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
