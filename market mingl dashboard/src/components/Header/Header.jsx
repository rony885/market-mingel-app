import React, { useEffect, useState } from "react";
import "@iconify-icon/react";
import { Link } from "react-router-dom";
import HeaderContent from "../HeaderContent";
const Header = ({ handleTogglle, handleLogout, c_user }) => {
  const [theme, setTheme] = useState(() => {
    // Get the theme from localStorage if available, else default to "light"
    return localStorage.getItem("theme") || "light";
  });
  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme to localStorage
  };
  // Effect to update HTML 'data-bs-theme' attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme); // Set 'data-bs-theme' on <html> element
  }, [theme]);

  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            {/* <!-- Menu Toggle Button --> */}
            <div className="topbar-item">
              <button
                type="button"
                className="button-toggle-menu me-2"
                onClick={handleTogglle}
              >
                <iconify-icon
                  icon="solar:hamburger-menu-broken"
                  className="fs-24 align-middle"
                ></iconify-icon>
              </button>
            </div>
            {/* <!-- Menu Toggle Button --> */}
            <HeaderContent c_user={c_user} />
          </div>
          <div className="d-flex align-items-center gap-1">
            {/* <!-- Theme Color (Light/Dark) --> */}
            <div className="topbar-item">
              <button
                type="button"
                className="topbar-button"
                id="light-dark-mode"
                onClick={toggleTheme}
              >
                <iconify-icon
                  icon={
                    theme === "light"
                      ? "solar:moon-bold-duotone"
                      : "solar:sun-bold-duotone"
                  }
                  className="fs-24 align-middle"
                ></iconify-icon>
              </button>
            </div>
            {/* <!-- User --> */}
            <div className="dropdown topbar-item">
              <Link
                type="button"
                className="topbar-button"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    width="32"
                    src={
                      c_user && c_user.image
                        ? `${process.env.REACT_APP_BASE_URL_2}/${c_user.image}`
                        : "/assets/images/user.jpg"
                    }
                    alt="avatar-3"
                  />
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">
                  Welcome{" "}
                  {`${
                    c_user.f_name !== undefined && c_user.f_name !== null
                      ? c_user.f_name
                      : ""
                  }` +
                    " " +
                    `${
                      c_user.l_name !== undefined && c_user.l_name !== null
                        ? c_user.l_name
                        : ""
                    }`}
                  !
                </h6>
                <Link className="dropdown-item" to="/profile">
                  <i className="bx bx-user-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Profile</span>
                </Link>
                <Link className="dropdown-item" to="/change-password">
                  <i className="bx bx-lock text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Change Password</span>
                </Link>
                <div className="dropdown-divider my-1"></div>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <i className="bx bx-log-out fs-18 align-middle me-1"></i>
                  <span className="align-middle">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
