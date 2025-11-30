import { UserCheck, Headphones, DollarSign, Star } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Expert Guidance",
    description:
      "Our visa team knows exactly what documents you need and helps you avoid mistakes that cause delays.",
  },
  {
    icon: DollarSign,
    title: "Best Price Guarantee",
    description:
      "Competitive pricing, no hidden charges. Get full value for your money with every application.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Got questions at midnight? No problem. Our support team is always available to help you.",
  },
  {
    icon: Star,
    title: "Curated Experiences",
    description:
      "We recommend the right visa options based on your purpose tourist, business, or transit so you never overpay.",
  },
];

const Whyus = () => {
  return (
    <section className="relative bg-[#041233] text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start justify-between">
        {/* LEFT: Text + Features */}
        <div className="max-w-3xl">
          <p className="text-[#F9CC00] text-sm font-semibold uppercase tracking-wide mb-2">
            Why Go With Chennai Visa Service
          </p>
          <h2 className="text-3xl md:text-[32px] font-semibold leading-snug text-white mb-4">
            Experience Hassle-free, Unforgettable Visa Journey With Expert
            Guidance
          </h2>
          <p className="text-[#A0B3D1] text-[15px] leading-relaxed mb-10 max-w-lg">
            We handle every detail of your visa process, ensuring a smooth and
            stress-free start to your journey.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-[#F9CC00] mt-1">
                  <feature.icon size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#A0B3D1] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Illustration */}
        <div className="mt-12 lg:mt-0 lg:ml-12 flex justify-center lg:justify-end">
          <img
            src="/whyus.webp" // replace with your correct image path
            alt="Happy travelers illustration"
            className="w-[320px] md:w-[360px] lg:w-[400px] object-contain"
          />
        </div>
      </div>

      {/* Decorative mountain image at bottom */}
      <img
        src="/mountain.png" // replace with your mountain image path
        alt="mountain decoration"
        className="absolute bottom-0 left-0 w-full object-cover"
      />
    </section>
  );
};

export default Whyus;
