import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const questionData = [
  {
    id: 1,
    question: "What does Chennai Visa Service do?",
    answer:
      "We assist Indian passport holders with eVisas and embassy visas through a fully online process.",
  },
  {
    id: 2,
    question: "Who can use Chennai Visa Service?",
    answer:
      "Any Indian passport holder looking to obtain eVisas or embassy visas can use our services. We provide comprehensive visa assistance for travelers, students, business professionals, and tourists.",
  },
  {
    id: 3,
    question: "How can I pay?",
    answer:
      "We accept multiple payment methods including credit cards, debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted.",
  },
  {
    id: 4,
    question: "How do I get my visa?",
    answer:
      "Once your application is approved, you will receive your eVisa via email. For embassy visas, we will coordinate the collection and delivery of your passport with the visa stamped.",
  },
  {
    id: 5,
    question: "How will I receive my visa and documents?",
    answer:
      "eVisas are sent directly to your email. Physical documents and passports are couriered to your registered address with tracking information provided.",
  },
  {
    id: 6,
    question: "Is support available?",
    answer:
      "Yes, our customer support team is available Monday to Saturday, 10 AM to 6 PM. You can reach us via phone, email, or live chat for any assistance.",
  },
  {
    id: 7,
    question: "Are the fees refundable?",
    answer:
      "Our service fees are non-refundable once the application has been submitted. However, government fees may be refundable depending on the specific visa policy of each country.",
  },
  {
    id: 8,
    question: "Anything else I should know?",
    answer:
      "Please ensure all your documents are valid and meet the requirements. Start your application well in advance of your travel date. Processing times vary by country and visa type.",
  },
];

const FAquestion = () => {
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {questionData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-blue-900 pr-4">
                  {faq.question}
                </h3>
                <div className="shrink-0">
                  {openId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openId === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-1">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAquestion;
