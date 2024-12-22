import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  });
  const [showPostForm, setShowPostForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/articles");
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          setErrorMessage('Failed to fetch articles. Please try again later.');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch articles. Please try again later.');
      }
    };

    fetchArticles();
  }, []);

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('id'); // Get user ID from local storage
      const token = localStorage.getItem('token'); // Get token from local storage
      const headers = {
        headers: {
          id: userId,
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("http://localhost:3000/api/user/add-article", newArticle, headers);
      setArticles((prevArticles) => [...prevArticles, response.data]);
      setShowPostForm(false);
      setNewArticle({ title: "", content: "" });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  const toggleExpandedArticle = (id) => {
    setExpandedArticleId((prevId) => (prevId === id ? null : id));
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-white text-center mb-6">Article Page</h1>
      {isLoggedIn && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-6 block mx-auto shadow-md hover:shadow-lg transition-all"
          onClick={() => setShowPostForm(!showPostForm)}
        >
          {showPostForm ? "Cancel" : "Post an Article"}
        </button>
      )}

      {showPostForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Post a New Article</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleArticleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Title</label>
              <input
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                type="text"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Content</label>
              <textarea
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white min-h-32"
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
            >
              Submit Article
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No articles available.</p>
        ) : (
          articles.map((article) => (
            <div
              key={article._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleExpandedArticle(article._id)}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{article.title}</h3>
              <p className="text-gray-300">
                {expandedArticleId === article._id ? article.content : `${article.content.slice(0, 100)}...`}
              </p>
              {expandedArticleId !== article._id && (
                <p className="text-blue-400 mt-2">Read more</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
