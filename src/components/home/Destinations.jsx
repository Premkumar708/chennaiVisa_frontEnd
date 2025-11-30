import { useState } from "react";
import { ArrowRight, Plane } from "lucide-react";

const destinations = [
  {
    name: "Zambia",
    image:
      "https://images.pexels.com/photos/4603765/pexels-photo-4603765.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "3155",
    badge: "1+ Visas on Time",
  },
  {
    name: "Malawi",
    image:
      "https://images.pexels.com/photos/3041866/pexels-photo-3041866.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "6395",
    badge: null,
  },
  {
    name: "United Arab Emirates - Dubai",
    image:
      "https://images.pexels.com/photos/1804898/pexels-photo-1804898.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "7366",
    badge: "5+ Visas on Time",
  },
  {
    name: "Vietnam",
    image:
      "https://images.trvl-media.com/place/6024117/f0cc4526-323d-430d-be20-daa78d3a6ebf.jpg?impolicy=fcrop&w=450&h=280&q=medium",
    price: "2950",
    badge: "4+ Visas on Time",
  },
  {
    name: "Ireland",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "12166",
    badge: "1+ Visas on Time",
  },
  {
    name: "Austria",
    image:
      "https://cdn.britannica.com/20/191120-050-B6C0B7E9/village-Hallstatt-Alps-Austria.jpg",
    price: "4501",
    badge: null,
  },
];

const formatPrice = (value) => {
  try {
    const n = Number(value);
    return new Intl.NumberFormat("en-IN").format(n);
  } catch (e) {
    return value;
  }
};

// show relative wording (no absolute dates). Change `days` to alter the relative offset.
const getRelativeDateText = (days = 7) => `Get on in ${days} days`;

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
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
            Explore Our Most Popular Destinations,
          </h2>
          <div className="flex items-center justify-center mt-2 gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
              Tailored For Every Traveler
            </h2>
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
            <article
              key={i}
              className="group bg-white rounded-3xl overflow-hidden shadow-md"
              aria-labelledby={`dest-${i}-title`}
            >
              <div className="relative h-64">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />

                {/* gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* small decorative plane */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 shadow-sm">
                  <Plane size={20} className="-rotate-12 text-yellow-400" />
                </div>

                {/* badge on image */}
                {dest.badge && (
                  <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    {dest.badge}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      id={`dest-${i}-title`}
                      className="text-xl font-bold text-blue-900 mb-1"
                    >
                      {dest.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {getRelativeDateText(7)}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-yellow-500">
                      ₹{formatPrice(dest.price)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      All inclusive
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Reliable visa processing with fast turnarounds.
                </p>

                <div className="flex items-center justify-between gap-3">
                  <button className="">
                    <a
                      href="/visa"
                      className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-xl font-semibold shadow hover:brightness-105 transition-all text-center"
                    >
                      Book Now
                    </a>
                  </button>

                  <button className="">
                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all w-auto"
                    >
                      Details <ArrowRight size={16} />
                    </a>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
