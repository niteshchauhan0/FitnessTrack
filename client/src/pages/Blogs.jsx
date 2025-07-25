import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top 5 Mistakes Beginners Make in the Gym",
    date: "July 20, 2025",
    excerpt:
      "Learn the most common mistakes and how to avoid them for better progress and safety in your fitness journey.",
    category: "Gym Tips",
    author: "John Doe",
    image:
      "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Meal Prep for Muscle Gain",
    date: "July 18, 2025",
    excerpt:
      "Understand how to structure your meals and macros to fuel muscle recovery and growth effectively.",
    category: "Nutrition",
    author: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  },
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-white">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 tracking-tight">
        Fitness Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-gray-50 rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-400 ease-in-out"
            aria-labelledby={`blog-title-${blog.id}`}
          >
            <div className="relative h-56 md:h-64 overflow-hidden rounded-t-3xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-center text-xs uppercase font-semibold text-indigo-600 tracking-widest mb-3">
                <span className="bg-indigo-100 px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <time dateTime={new Date(blog.date).toISOString()} className="text-gray-500">
                  {blog.date}
                </time>
              </div>
              <h2
                id={`blog-title-${blog.id}`}
                className="text-2xl font-bold mb-4 text-gray-900 leading-snug line-clamp-2"
              >
                {blog.title}
              </h2>
              <p className="text-gray-700 flex-grow mb-6 line-clamp-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-sm font-medium text-gray-600">
                  By <span className="text-indigo-700">{blog.author}</span>
                </div>
                <Link
                  to="/coming-soon"
                  className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  Read More
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
