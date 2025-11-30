import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Visa from "./pages/Visa";
import VisaDetail from "./components/visa/VisaDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import AuthProvider from "./context/AuthContext";
import VisaOptions from "./components/visa/VisaOptions";
import VisaApply from "./components/visa/VisaApply";
import ApplyVisa from "./components/visa/ApplyVisa";

// NEW
import TravellerForm from "./components/visa/TravellerForm";
import ReviewPay from "./components/visa/ReviewPay";
// import { ApplicationProvider } from "./context/ApplicationContext";

import ScrollToTop from "./components/common/ScrollToTop";
import ApplicationProvider from "./context/ApplicationContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* provide dates + travellers state to the flow */}
        <ApplicationProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visa" element={<Visa />} />
                <Route path="/visa/:slug" element={<VisaDetail />} />
                <Route path="/visa/:slug/:purpose" element={<VisaOptions />} />

                {/* Info page with tabs */}
                <Route path="/visa/:slug/:purpose/visapply" element={<VisaApply />} />
                {/* Your alias */}
                <Route path="/visa/:slug/:purpose/applyvisa" element={<ApplyVisa />} />

                {/* NEW: add traveller form + review & pay */}
                <Route path="/visa/:slug/:purpose/traveller/new" element={<TravellerForm />} />
                <Route path="/visa/:slug/:purpose/review" element={<ReviewPay />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </main>
            {/* <Footer /> */}
          </div>
        </ApplicationProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
