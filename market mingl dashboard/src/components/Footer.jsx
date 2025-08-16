import React from "react";
// import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
// const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            {new Date().getFullYear()} &copy; Market Mingel International.
            Designed & Developed by{" "}
            <Link
              to="https://www.ekattorit.com/"
              className="fw-bold footer-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              EKATTOR iT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
