import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UL from "./UL";

const SidebarMenu = ({ handleTogglle }) => {
  const handleToggle = () => {
    const htmlElement = document.documentElement;
    const currentSize = htmlElement.getAttribute("data-menu-size");

    const newSize =
      currentSize === "sm-hover-active" ? "sm-hover" : "sm-hover-active";
    htmlElement.setAttribute("data-menu-size", newSize);
  };

  return (
    <Wrapper>
      <div className="main-nav">
        <div className="logo-box d-flex align-items-center justify-content-between">
          <div>
            <Link to="/" className="logo-dark">
              <img
                src="/assets/images/MM 3D Logo.svg"
                className="logo-sm"
                alt="logo sm"
              />
              <img
                src="/assets/images/MM 3D Logo.svg"
                className="logo-lg"
                alt="logo dark"
              />
            </Link>

            <Link to="/" className="logo-light">
              <img
                src="/assets/images/MM 3D Logo.svg"
                className="logo-sm"
                alt="logo sm"
              />
              <img
                src="/assets/images/MM 3D Logo.svg"
                className="logo-lg"
                alt="logo light"
                style={{ width: "150px", height: "100px" }}
              />
            </Link>
          </div>

          <div className="d-lg-none xxxx_button">
            <button
              onClick={handleTogglle}
              className="btn btn-sm btn-danger rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "30px", height: "30px" }}
            >
              &times;
            </button>
          </div>
        </div>

        {/* <!-- Menu Toggle Button (sm-hover) --> */}
        <button
          type="button"
          className="button-sm-hover"
          aria-label="Show Full Sidebar"
          onClick={handleToggle}
        >
          <iconify-icon
            icon="solar:double-alt-arrow-right-bold-duotone"
            className="button-sm-hover-icon"
          ></iconify-icon>
        </button>

        <div
          className="scrollbar"
          data-simplebar
          // style={{ overflow: "auto", height: "85vh" }}
        >
          <div className="simplebar-wrapper" style={{ margin: "0px" }}>
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer"></div>
            </div>

            <div className="simplebar-mask">
              <div
                className="simplebar-offset"
                style={{ right: "0px", bottom: "0px" }}
              >
                <div
                  className="simplebar-content-wrapper"
                  tabIndex="0"
                  role="region"
                  aria-label="scrollable content"
                  style={{ height: "100%", overflow: "hidden scroll" }}
                >
                  <div className="simplebar-content" style={{ padding: "0px" }}>
                    <UL handleTogglle={handleTogglle} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="simplebar-placeholder"
              style={{ width: "auto", height: "1779px" }}
            ></div>
          </div>

          <div
            className="simplebar-track simplebar-horizontal"
            style={{ visibility: "hidden" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{ width: "0px", display: "none" }}
            ></div>
          </div>

          <div
            className="simplebar-track simplebar-vertical"
            style={{ visibility: "visible" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{
                height: "481px",
                transform: "translate3d(0px, 0px, 0px)",
                display: "block",
              }}
            ></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .xxxx_button {
    display: none !important;
  }

  @media screen and (max-width: 1141px) {
    .xxxx_button {
      display: block !important;
    }
  }
`;

export default SidebarMenu;
