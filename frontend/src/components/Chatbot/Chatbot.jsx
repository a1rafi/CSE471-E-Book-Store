import React from "react";
import ChatBot from "react-chatbotify";
import "./Chatbot.css";

const helpOptions = ["All Books", "Home", "Articles", "Profile"];
const flow = {
  start: {
    message: "Hello dear customer👋! Welcome to Book Heaven, how can I help you? " +
      " 😊!",
    transition: { duration: 1000 },
    path: "show_options"
  },
  show_options: {
    message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
      "things you can check out to get started:",
    options: helpOptions,
    path: "process_options"
  },
  prompt_again: {
    message: "Do you need any other help?",
    options: helpOptions,
    path: "process_options"
  },
  unknown_input: {
    message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on one the Home option and open an issue there.",
    options: helpOptions,
    path: "process_options"
  },
  process_options: {
    transition: { duration: 0 },
    chatDisabled: true,
    path: async (params) => {
      let link = "";
      switch (params.userInput) {
        case "All Books":
          link = "http://localhost:5173/AllBooks";
          break;
        case "Home":
          link = "http://localhost:5173/";
          break;
        case "Articles":
          link = "http://localhost:5173/articles";
          break;
        case "Profile":
          link = "http://localhost:5173/profile";
          break;
        default:
          return "unknown_input";
      }
      await params.injectMessage("Sit tight! I'll send you right there!");
      setTimeout(() => {
        window.location.href = link;
      }, 1000)
      return "repeat"
    },
  },
  repeat: {
    transition: { duration: 3000 },
    path: "prompt_again"
  },
}



const MyChatBot = () => {
  return (
    <ChatBot options={{ theme: { embedded: true }, chatHistory: { storageKey: "example_faq_bot" } }} flow={flow} />
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={toggleChatbot}>
      <img src="/book.jpg" alt="Chatbot Logo" className="w-8 h-8" />      </button>
      {isOpen && (
        <div className="fixed bottom-10 right-0 z-50 w-96 bg-white border border-gray-300 rounded-tl-2xl shadow-lg">
          <MyChatBot />
        </div>
      )}
    </div>
  );
};

export default Chatbot;