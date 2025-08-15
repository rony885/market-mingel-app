import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UL = ({ handleTogglle }) => {
  const location = useLocation(); // Get current URL path
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  // Sync active menu and submenu with the current URL
  useEffect(() => {
    const path = location.pathname;
    // Define menu mappings based on paths
    const menuMappings = {
      "/": "dashboard",

      // home
      "/home": "home",

      // about
      "/about-us": "about",
      "/about-team": "about",

      // service
      "/service-category": "service",
      "/service-category-add": "service",
      "/service-category-edit": "service",
      "/service": "service",
      "/service-add": "service",
      "/service-edit": "service",

      // emigrant-division
      "/international-visa-experts": "emigrant-service",
      "/international-visa-experts-add": "emigrant-service",
      "/international-visa-experts-edit": "emigrant-service",

      "/emigrant-service-content": "emigrant-service",

      "/emigrant-service-category": "emigrant-service",
      "/emigrant-service-category-add": "emigrant-service",
      "/emigrant-service-category-edit": "emigrant-service",

      "/emigrant-service": "emigrant-service",
      "/emigrant-service-add": "emigrant-service",
      "/emigrant-service-edit": "emigrant-service",

      // client
      "/client": "client",
      "/client-add": "client",
      "/client-edit": "client",

      // business-proposal
      "/business-proposal": "business-proposal",

      // contact
      "/contact": "contact",

      // setting
      "/setting": "setting",

      // user
      "/user": "user",
      "/user-add": "user",
      "/user-edit": "user",

      // authentication
      "/profile": "profile",
      "/change-password": "change-password",
    };

    // Define submenu mappings based on paths
    const subMenuMappings = {
      "/": "",

      // home
      "/home": "home",

      // about
      "/about-us": "about-us",
      "/about-team": "about-team",

      // service
      "/service-category": "service-category",
      "/service-category-add": "service-category-add",
      "/service-category-edit": "service-category-edit",
      "/service": "service",
      "/service-add": "service-add",
      "/service-edit": "service-edit",

      // emigrant-division
      "/international-visa-experts": "international-visa-experts",
      "/international-visa-experts-add": "international-visa-experts-add",
      "/international-visa-experts-edit": "international-visa-experts-edit",

      "/emigrant-service-content": "emigrant-service-content",
      "/emigrant-service-category": "emigrant-service-category",
      "/emigrant-service-category-add": "emigrant-service-category-add",
      "/emigrant-service-category-edit": "emigrant-service-category-edit",

      "/emigrant-service": "emigrant-service",
      "/emigrant-service-add": "emigrant-service-add",
      "/emigrant-service-edit": "emigrant-service-edit",

      // client
      "/client": "client",
      "/client-add": "client-add",
      "/client-edit": "client-edit",

      // business-proposal
      "/business-proposal": "business-proposal",

      // contact
      "/contact": "contact",

      // setting
      "/setting": "setting",

      // user
      "/user": "user",
      "/user-add": "user-add",
      "/user-edit": "user-edit",

      // authentication
      "/profile": "profile",
      "/change-password": "change-password",
    };

    // Update active menu and active submenu based on the URL path
    if (path.startsWith("/about-team-add")) {
      setActiveMenu("about");
      setActiveSubMenu("about-team");
    } else if (path.startsWith("/about-team-edit")) {
      setActiveMenu("about");
      setActiveSubMenu("about-team");
    } else if (path.startsWith("/service-category-add")) {
      setActiveMenu("service");
      setActiveSubMenu("service-category");
    } else if (path.startsWith("/service-category-edit")) {
      setActiveMenu("service");
      setActiveSubMenu("service-category");
    } else if (path.startsWith("/service-add")) {
      setActiveMenu("service");
      setActiveSubMenu("service");
    } else if (path.startsWith("/service-edit")) {
      setActiveMenu("service");
      setActiveSubMenu("service");
    } else if (path.startsWith("/emigrant-service-category-add")) {
      setActiveMenu("emigrant-service");
      setActiveSubMenu("emigrant-service-category");
    } else if (path.startsWith("/emigrant-service-category-edit")) {
      setActiveMenu("emigrant-service");
      setActiveSubMenu("emigrant-service-category");
    } else if (path.startsWith("/emigrant-service-add")) {
      setActiveMenu("emigrant-service");
      setActiveSubMenu("emigrant-service");
    } else if (path.startsWith("/emigrant-service-edit")) {
      setActiveMenu("emigrant-service");
      setActiveSubMenu("emigrant-service");
    } else if (path.startsWith("/client-add")) {
      setActiveMenu("client");
      setActiveSubMenu("client");
    } else if (path.startsWith("/client-edit")) {
      setActiveMenu("client");
      setActiveSubMenu("client");
    } else if (path.startsWith("/user-add")) {
      setActiveMenu("user");
      setActiveSubMenu("user");
    } else if (path.startsWith("/user-edit")) {
      setActiveMenu("user");
      setActiveSubMenu("user");
    } else {
      setActiveMenu(menuMappings[path] || "");
      setActiveSubMenu(subMenuMappings[path] || "");
    }
  }, [location.pathname]);

  // Handle submenu toggle (open/close)
  const handleSubMenuToggle = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? "" : menu));
  };

  return (
    <>
      <ul className="navbar-nav" id="navbar-nav">
        <li className="nav-item">
          <Link
            className={`nav-link ${activeMenu === "dashboard" ? "active" : ""}`}
            onClick={handleTogglle}
            to="/"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> Dashboard </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link menu-arrow ${
              activeMenu === "home" ? "active" : ""
            }`}
            onClick={() => handleSubMenuToggle("home")}
            to="#sidebarHome"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarHome"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:home-2-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> Home </span>
          </Link>

          <div
            className={`collapse ${activeMenu === "home" ? "show" : ""}`}
            id="sidebarHome"
          >
            <ul className="nav sub-navbar-nav">
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "home" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/home"
                >
                  Home Section
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link menu-arrow ${
              activeMenu === "about" ? "active" : ""
            }`}
            onClick={() => handleSubMenuToggle("about")}
            to="#sidebarAbout"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarAbout"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:info-square-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> About </span>
          </Link>
          <div
            className={`collapse ${activeMenu === "about" ? "show" : ""}`}
            id="sidebarAbout"
          >
            <ul className="nav sub-navbar-nav">
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "about-us" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/about-us"
                >
                  About Us
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "about-team" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/about-team"
                >
                  About Team
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link menu-arrow ${
              activeMenu === "service" ? "active" : ""
            }`}
            onClick={() => handleSubMenuToggle("service")}
            to="#sidebarService"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarService"
          >
            <span className="nav-icon">
              <iconify-icon icon="mdi:account-wrench"></iconify-icon>
            </span>
            <span className="nav-text"> Service </span>
          </Link>
          <div
            className={`collapse ${activeMenu === "service" ? "show" : ""}`}
            id="sidebarService"
          >
            <ul className="nav sub-navbar-nav">
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "service-category" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/service-category"
                >
                  Service Category
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "service" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/service"
                >
                  Service
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link menu-arrow ${
              activeMenu === "emigrant-service" ? "active" : ""
            }`}
            onClick={() => handleSubMenuToggle("emigrant-division")}
            to="#sidebarEmigrantService"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarEmigrantService"
          >
            <span className="nav-icon">
              <iconify-icon icon="mdi:airplane"></iconify-icon>
            </span>
            <span className="nav-text"> Emigrant Division </span>
          </Link>
          <div
            className={`collapse ${
              activeMenu === "emigrant-service" ? "show" : ""
            }`}
            id="sidebarEmigrantService"
          >
            <ul className="nav sub-navbar-nav">
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "emigrant-service-content" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/emigrant-service-content"
                >
                  Emigrant Service Content
                </Link>
              </li>

              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "emigrant-service-category"
                      ? "active"
                      : ""
                  }`}
                  onClick={handleTogglle}
                  to="/emigrant-service-category"
                >
                  Emigrant Service Category
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link
                  className={`sub-nav-link  ${
                    activeSubMenu === "emigrant-service" ? "active" : ""
                  }`}
                  onClick={handleTogglle}
                  to="/emigrant-service"
                >
                  Emigrant Service
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeMenu === "client" ? "active" : ""}`}
            onClick={handleTogglle}
            to="/client"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:users-group-rounded-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> Client </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${
              activeMenu === "business-proposal" ? "active" : ""
            }`}
            onClick={handleTogglle}
            to="/business-proposal"
          >
            <span className="nav-icon">
              <iconify-icon icon="mdi:handshake-outline"></iconify-icon>
            </span>
            <span className="nav-text"> Business Proposal </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeMenu === "contact" ? "active" : ""}`}
            onClick={handleTogglle}
            to="/contact"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:phone-linear"></iconify-icon>
            </span>
            <span className="nav-text"> Contact </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeMenu === "setting" ? "active" : ""}`}
            onClick={handleTogglle}
            to="/setting"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:settings-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> Setting </span>
          </Link>
        </li>

        <li className="menu-title">Authentication</li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeMenu === "user" ? "active" : ""}`}
            onClick={handleTogglle}
            to="/user"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:user-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> User </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeMenu === "profile" ? "active" : ""}`}
            onClick={handleTogglle}
            to="/profile"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:user-circle-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> Profile</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${
              activeMenu === "change-password" ? "active" : ""
            }`}
            onClick={handleTogglle}
            to="/change-password"
          >
            <span className="nav-icon">
              <iconify-icon icon="solar:lock-password-bold-duotone"></iconify-icon>
            </span>
            <span className="nav-text"> Change Password </span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default UL;
