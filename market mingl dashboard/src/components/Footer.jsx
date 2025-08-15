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
            {new Date().getFullYear()} &copy; Market Mingel International. Designed &
            Developed by{" "}
            {/* <Icon
              icon="iconamoon:heart-duotone"
              className="fs-18 align-middle text-danger"
            /> */}
            <Link
              to="https://www.ekattorit.com/"
              className="fw-bold footer-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              EKATTOR iT
              {/* <span style={{ color: "red" }}>EKATTOR</span>
              <span style={{ color: "green" }}> iT</span> */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
