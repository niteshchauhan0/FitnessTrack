import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-white p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full border border-indigo-100">
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 tracking-tight">
          🚧 Coming Soon!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          This blog page is under development. Stay tuned for exciting updates!
        </p>
        <button
          onClick={() => navigate("/blogs")}
          className="inline-flex items-center justify-center px-6 py-2.5 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition duration-300"
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
