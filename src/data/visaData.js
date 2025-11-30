export const visaData = {
  thailand: {
    tourist: {
      country: "Thailand",
      visaType: "Tourist Visa",
      stayDuration: "Up to 30 days",
      image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800",
      disclaimer: [
        "Business Days: Monday to Friday",
        "Prices are subject to change without notice",
        "Provision limited to first 50 users",
        "Additional documents may be required in some cases",
      ],
      schedule: [
        {
          date: "Fri, Nov 2, 2025",
          title: "Visa Review Started",
          description: "Document verification in progress.",
        },
        {
          date: "Mon, Nov 4, 2025",
          title: "Document Verification",
          description: "Your application is under document verification.",
        },
        {
          date: "Wed, Nov 6, 2025",
          title: "Awaiting Embassy Decision",
          description: "Pending final approval.",
        },
      ],
      timings: {
        operating: [
          "Operating Hours: 9 AM - 5 PM (Mon - Fri)",
          "Saturday & Sunday Closed",
        ],
        holidays: [
          "Public Holidays: Closed on Thai National Holidays",
          "Refer to official government website for dates.",
        ],
      },
      documents: [
        "Valid Passport (6 months minimum)",
        "2 Passport size photos",
        "Flight reservation proof",
        "Hotel booking confirmation",
        "Bank statement (last 3 months)",
      ],
      importantDetails: [
        "Visa fees are non-refundable.",
        "Processing time may vary by embassy.",
      ],
      faqs: [
        {
          question: "How long does the process take?",
          answer: "Usually 3–5 business days after document submission.",
        },
        {
          question: "Can I extend my visa stay?",
          answer:
            "Yes, you can apply for an extension at local immigration offices.",
        },
      ],
    },
    business: {
      country: "Thailand",
      visaType: "Business Visa",
      stayDuration: "Up to 60 days",
      image: "/images/thailand-business.jpg",
      disclaimer: [
        "Requires business invitation letter",
        "Processing may take longer than tourist visa",
      ],
      schedule: [],
      timings: { operating: [], holidays: [] },
      documents: [],
      importantDetails: [],
      faqs: [],
    },
  },
  dubai: {
    tourist: {
      country: "Dubai",
      visaType: "Tourist Visa",
      stayDuration: "30 days",
      image: "/images/dubai.jpg",
      disclaimer: ["Subject to UAE immigration policies"],
      schedule: [],
      timings: { operating: [], holidays: [] },
      documents: [],
      importantDetails: [],
      faqs: [],
    },
  },
};
