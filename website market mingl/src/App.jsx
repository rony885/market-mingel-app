import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Loader from "./components/Loader";
import ScrolltoTop from "./components/ScrolltoTop";
import Top from "./components/Top";
// import MouseCursor from "./components/MouseCursor";
// import TemplateOption from "./components/TemplateOption";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";

import Services from "./pages/Services/Services";
import GlobalAssociate from "./pages/GlobalAssociate/GlobalAssociate";

import EmigrantService from "./pages/EmigrantService/EmigrantService";
import EmigrantServiceDetails from "./pages/EmigrantServiceDetails/EmigrantServiceDetails";

import Contact from "./pages/Contact/Contact";

import HelpSupport from "./pages/HelpSupport/HelpSupport";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

import BusinnesProposal from "./pages/BusinnesProposal/BusinnesProposal";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // global duration override (optional)
      once: true, // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    AOS.refresh(); // Recalculate AOS positions after render
  });

  return (
    <div className="App">
      <BrowserRouter>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Top />
            <div className="page-wrapper a-cursor">
              <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
              <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />

                <Route path="/global-associate" element={<GlobalAssociate />} />

                <Route
                  path="/emigrant-division"
                  element={<EmigrantService />}
                />
                <Route
                  path="/emigrant-division-details/:id"
                  element={<EmigrantServiceDetails />}
                />

                <Route path="/contact" element={<Contact />} />

                <Route path="/help-support" element={<HelpSupport />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/business-proposal"
                  element={<BusinnesProposal />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              {/* <MouseCursor /> */}
              <ScrolltoTop />
              {/* <TemplateOption /> */}
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./App.css";
// import Header from "./components/Header";
// import MobileMenu from "./components/MobileMenu";
// import Home from "./pages/Home/Home";
// import Footer from "./components/Footer";
// import Loader from "./components/Loader";
// import ScrolltoTop from "./components/ScrolltoTop";
// import MouseCursor from "./components/MouseCursor";
// import TemplateOption from "./components/TemplateOption";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="App">
//       <BrowserRouter>

//         <div className="page-wrapper a-cursor">
//  {/* <Loader /> */}
//           <Header />
//           <MobileMenu />
//           <Routes>
//             <Route path="/" element={<Home />} />
//           </Routes>
//           <Footer />
//           <MouseCursor />
//           <ScrolltoTop />
//           <TemplateOption />
//         </div>

//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
