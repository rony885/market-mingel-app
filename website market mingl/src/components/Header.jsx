import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header = ({ toggleMenu, menuOpen }) => {
  const location = useLocation();

  // Update isActive to support subroutes
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-header__menu-box">
              <nav className="navbar p-0">
                <div className="navbar__intro">
                  <div className="navbar-logo">
                    <Link to="/">
                      {/* <img src="/assets/images/logo.png" alt="Imagee" /> */}
                      <img
                        src="/assets/images/logo/MM 3D Logo.svg"
                        alt="Imagee"
                        style={{ width: "150px", height: "120px" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="navbar__menu d-none d-xl-block">
                  <ul className="navbar__list">
                    <li
                      className={`navbar__item ${
                        isActive("/") ? "active" : ""
                      }`}
                    >
                      <Link to="/">Home</Link>
                    </li>

                    <li
                      className={`navbar__item ${
                        isActive("/about") ? "active" : ""
                      }`}
                    >
                      <Link to="/about">About Us</Link>
                    </li>

                    <li
                      // className={`navbar__item ${
                      //   location.pathname === "/services" ? "active" : ""
                      // }`}
                      className={`navbar__item ${
                        isActive("/services") ? "active" : ""
                      }`}
                    >
                      <Link to="/services">Our Services</Link>
                    </li>

                    <li
                      className={`navbar__item ${
                        isActive("/global-associate") ? "active" : ""
                      }`}
                    >
                      <Link to="/global-associate">Global Associate</Link>
                    </li>

                    <li
                      className={`navbar__item ${
                        isActive("/emigrant-division") ? "active" : ""
                      }`}
                    >
                      <Link to="/emigrant-division">Emigrant Division</Link>
                    </li>

                    <li
                      className={`navbar__item ${
                        isActive("/contact") ? "active" : ""
                      }`}
                    >
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
                <div className="navbar__options">
                  <div className="navbar__mobile-options">
                    <div className="navbar__cta d-none d-sm-flex">
                      <Link
                        to="/business-proposal"
                        aria-label="create account"
                        title="create account"
                        className="btn--primary"
                      >
                        Business Proposal{" "}
                        <i className="ti ti-arrow-narrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  <button
                    className={`open-offcanvas-nav d-flex d-xl-none ${
                      menuOpen ? "open-offcanvas-nav-active" : ""
                    }`}
                    onClick={toggleMenu}
                    aria-label="toggle mobile menu"
                    title="open offcanvas menu"
                  >
                    <span className="icon-bar top-bar"></span>
                    <span className="icon-bar middle-bar"></span>
                    <span className="icon-bar bottom-bar"></span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
