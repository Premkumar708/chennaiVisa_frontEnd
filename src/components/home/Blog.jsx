import React from "react";
import { Plane } from "lucide-react";

const blogPosts = [
  {
    image:
      "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "MALAYSIA",
    author: "VinothKumar",
    date: "7 September 2025",
    title: "This 3-Day Malaysia Secret Will Save You Thousands",
  },
  {
    image:
      "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "SINGAPORE",
    author: "BhuvaniDharan",
    date: "17 July 2025",
    title:
      "Get Your Singapore Tourist Visa in Just 2 Days with Chennai Visa Service – Fast, Reliable & Hassle-Free!",
  },
];

const Blog = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <p className="text-[#F9CC00] text-sm font-semibold uppercase tracking-wide mb-2">
            What We’re Talking About
          </p>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-[#041233] leading-tight">
              Travel Tips, Visa Guides & Inspiring
            </h2>

            <div className="flex items-center justify-center relative">
              <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-[#041233]">
                Stories From Around the World
              </h2>

              {/* Plane + Path */}
              {/* <div className="absolute -right-20 md:-right-32 top-2 flex items-center">
                <svg
                  width="120"
                  height="60"
                  viewBox="0 0 120 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -top-8 right-8"
                >
                  <path
                    d="M10 40 Q60 10, 110 40"
                    stroke="#F9CC00"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                </svg>
                <Plane
                  size={36}
                  className="text-[#F9CC00] rotate-45 relative top-[-10px]"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-5 left-5 bg-white text-[#041233] px-4 py-1.5 rounded-full text-xs font-semibold uppercase shadow-md">
                  {post.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#041233] group-hover:text-[#0C3F91] transition-colors duration-300">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
