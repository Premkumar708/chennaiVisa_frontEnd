// src/components/Destinations.jsx
import { useState } from "react";
import { ArrowRight, Plane } from "lucide-react";

const destinations = [
  {
    name: "Zambia",
    image:
      "https://images.pexels.com/photos/4603765/pexels-photo-4603765.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "3,155",
    date: "Get on 06 Nov 2025",
    badge: "1+ Visas on Time",
  },
  {
    name: "Malawi",
    image:
      "https://images.pexels.com/photos/3041866/pexels-photo-3041866.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "6,395",
    date: "Get on 12 Nov 2025",
    badge: null,
  },
  {
    name: "United Arab Emirates - Dubai",
    image:
      "https://images.pexels.com/photos/1804898/pexels-photo-1804898.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "7,366",
    date: "Get on 07 Nov 2025",
    badge: "5+ Visas on Time",
  },
  {
    name: "Vietnam",
    image:
      "https://images.pexels.com/photos/159711/lake-vietnam-halong-bay-travel-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "2,950",
    date: "Get on 09 Nov 2025",
    badge: "4+ Visas on Time",
  },
  {
    name: "Ireland",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "12,166",
    date: "Get on 10 Nov 2025",
    badge: "1+ Visas on Time",
  },
  {
    name: "Austria",
    image:
      "https://images.pexels.com/photos/327821/pexels-photo-327821.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "4,501",
    date: "Get on 14 Nov 2025",
    badge: null,
  },
];

const Destinations = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Trending", "E-Visa", "Express", "Cheapest"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-yellow-500 font-semibold text-sm uppercase tracking-wider mb-2">
            TRENDY TRAVEL DESTINATIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-snug">
            Explore Our Most Popular Destinations,
          </h2>
          <div className="flex items-center justify-center mt-2 gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
              Tailored For Every Traveler
            </h2>
            {/* <div className="relative">
                <Plane className="text-yellow-400 rotate-45" size={42} />
                <svg
                  className="absolute -top-6 -right-12"
                  width="100"
                  height="60"
                  viewBox="0 0 100 60"
                >
                  <path
                    d="M 10 30 Q 50 10, 90 30"
                    stroke="#FCD34D"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div> */}
          </div>
        </div>

        {/* Filters + Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Filters */}
          <div className="w-full md:w-auto">
            <div className="flex overflow-x-auto md:flex-wrap gap-3 md:gap-4 no-scrollbar">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-blue-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* See More Button */}
          <button className="bg-yellow-400 text-blue-900 px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-300 transition-all flex items-center gap-2 self-start md:self-auto">
            See More
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {dest.badge && (
                  <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                    {dest.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-blue-900">
                    {dest.name}
                  </h3>
                  <span className="text-xl font-bold text-yellow-500">
                    ₹{dest.price}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{dest.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
