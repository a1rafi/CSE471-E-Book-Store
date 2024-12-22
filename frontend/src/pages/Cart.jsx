import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    bookId: "",
    title: "",
    content: "",
    category: "",
  });
  const [showPostForm, setShowPostForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles");
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          setErrorMessage("Failed to fetch articles. Please try again later.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch articles. Please try again later.");
      }
    };

    fetchArticles();
  }, []);

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = "user-id-from-auth"; // Replace with actual user ID
      const headers = {
        headers: {
          id: userId,
        },
      };
      const response = await axios.post("/api/add-article", newArticle, headers);
      setArticles((prevArticles) => [...prevArticles, response.data]);
      setShowPostForm(false);
      setNewArticle({ bookId: "", title: "", content: "", category: "" });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-zinc-900 px-12 py-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Article Page</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-6"
        onClick={() => setShowPostForm(!showPostForm)}
      >
        {showPostForm ? "Cancel" : "Post an Article"}
      </button>

      {showPostForm && (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Post a New Article</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleArticleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Book ID</label>
              <input
                className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={newArticle.bookId}
                onChange={(e) => setNewArticle({ ...newArticle, bookId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Title</label>
              <input
                className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Content</label>
              <textarea
                className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32"
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <input
                className="w-full p-2 border border-gray-600 rounded-md bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={newArticle.category}
                onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
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
            <div key={article._id} className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-white">{article.title}</h3>
              <p className="text-sm text-blue-400 mb-3">{article.category}</p>
              <p className="text-gray-300">{article.content}</p>
            </div>
          ))
        )}
      </div>

      
    </div>
  );
};

export default ArticlePage;
