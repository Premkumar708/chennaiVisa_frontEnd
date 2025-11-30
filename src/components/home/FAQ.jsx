import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What does Chennai Visa Service do?",
    answer:
      "We assist Indian passport holders with eVisas and embassy visas through a fully online process.",
  },
  {
    question: "Who can use Chennai Visa Service?",
    answer:
      "Any Indian passport holder looking to travel abroad can use our services for tourist, business, or transit visas.",
  },
  {
    question: "How can I pay?",
    answer:
      "We accept all major payment methods including credit cards, debit cards, UPI, and net banking.",
  },
  {
    question: "How do I get my visa?",
    answer:
      "Once approved, your eVisa will be sent to your email. For embassy visas, we will coordinate the collection and delivery of your passport.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#fafafa] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-start mb-10">
          <p className="text-[#ffbf00] text-sm font-semibold uppercase tracking-wide mb-1">
            Frequently Ask Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-snug tracking-tight">
            Common Questions About Chennai Visa Service
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Illustration */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/faq.png" // replace with your image path
              alt="FAQ illustration"
              className="w-[200px] md:w-60 lg:w-[260px] object-contain"
            />
          </div>

          {/* Accordion Section */}
          <div className="flex flex-col space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-lg transition-all duration-300 ${
                  openIndex === index ? "shadow-sm" : "hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-[16px] md:text-[17px] font-semibold text-[#002b5c]">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="text-[#002b5c]" size={20} />
                  ) : (
                    <ChevronDown className="text-[#002b5c]" size={20} />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    openIndex === index ? "max-h-32" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600 text-[15px] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
