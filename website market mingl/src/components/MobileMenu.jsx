import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useApiContext } from "../context/ApiContext";

const MobileMenu = ({ menuOpen, closeMenu }) => {
  // data fetching
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);
  const location = useLocation();

  // Update isActive to support subroutes
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={`mobile-menu d-block d-xl-none ${
          menuOpen ? "show-menu" : ""
        } 
      `}
      >
        <nav className="mobile-menu__wrapper">
          <div className="mobile-menu__header">
            <div className="logo">
              <Link to="/" aria-label="home page" title="logo">
                {/* <img src="assets/images/logo.png" alt="Imagee" /> */}
                <img
                  src="/assets/images/logo/MM 3D Logo.svg"
                  alt="Imagee"
                  style={{ width: "168px", height: "110px" }}
                />
              </Link>
            </div>
            <button
              onClick={closeMenu}
              aria-label="close mobile menu"
              className="close-mobile-menu"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>
          <div className="mobile-menu__list">
            <ul className="navbar__list">
              <li
                className={`navbar__item ${isActive("/") ? "active" : ""}`}
                onClick={closeMenu}
              >
                <Link to="/">Home</Link>
              </li>

              <li
                className={`navbar__item ${isActive("/about") ? "active" : ""}`}
                onClick={closeMenu}
              >
                <Link to="/about">About Us</Link>
              </li>

              <li
                className={`navbar__item ${
                  isActive("/services") ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <Link to="/services">Our Services</Link>
              </li>

              <li
                className={`navbar__item ${
                  isActive("/global-associate") ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <Link to="/global-associate">Global Associate</Link>
              </li>

              <li
                className={`navbar__item ${
                  isActive("/emigrant-division") ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <Link to="/emigrant-division">Emigrant Division</Link>
              </li>

              <li
                className={`navbar__item ${
                  isActive("/contact") ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div
            className="mobile-menu__cta d-block d-md-none"
            onClick={closeMenu}
          >
            <Link
              to="/business-proposal"
              aria-label="create account"
              title="create account"
              className="btn--primary"
            >
              Business Proposal <i className="ti ti-arrow-narrow-right"></i>
            </Link>
          </div>
          <div className="mobile-menu__social social">
            <Link
              to={unpaginate_setting && unpaginate_setting.fbLink}
              target="_blank"
              aria-label="share us on facebook"
              title="facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <Link
              to={unpaginate_setting && unpaginate_setting.instragramLink}
              target="_blank"
              aria-label="share us on instagram"
              title="instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link
              to={unpaginate_setting && unpaginate_setting.youtubeLink}
              target="_blank"
              aria-label="share us on twitter"
              title="Twitter"
            >
              <i className="fab fa-x-twitter"></i>
            </Link>
            <Link
              to={unpaginate_setting && unpaginate_setting.whatsappLink}
              target="_blank"
              aria-label="share us on linkedin"
              title="linkedin"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </Link>
          </div>
        </nav>
      </div>

      <div
        className={`mobile-menu__backdrop ${
          menuOpen ? "mobile-menu__backdrop-active" : ""
        }`}
      ></div>
    </>
  );
};

export default MobileMenu;
