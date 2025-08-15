// import React from "react";

// const MouseCursor = () => {
//   return (
//     <>
//       <div className="mouseCursor cursor-outer"></div>
//       <div className="mouseCursor cursor-inner"></div>
//     </>
//   );
// };

// export default MouseCursor;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MouseCursor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState("animated");
  const [direction, setDirection] = useState("ltr");

  // Load from localStorage on mount
  useEffect(() => {
    const savedCursor = localStorage.getItem("cursor");
    const savedDirection = localStorage.getItem("direction");

    if (savedCursor) setCursor(savedCursor);
    if (savedDirection) {
      setDirection(savedDirection);
      document.documentElement.setAttribute("dir", savedDirection); // Apply direction globally
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cursor", cursor);
  }, [cursor]);

  useEffect(() => {
    localStorage.setItem("direction", direction);
    document.documentElement.setAttribute("dir", direction); // Apply direction globally
  }, [direction]);

  return (
    <Wrapper>
      <div className="color-palate">
        <div className="color-icon" style={{ right: isOpen ? "280px" : "0px" }}>
          <button
            className="open-color"
            onClick={() => setIsOpen(true)}
            style={{ display: isOpen ? "none" : "inline-block" }}
          >
            <i className="ti ti-settings-filled"></i>
          </button>
          <button
            className="close-color"
            onClick={() => setIsOpen(false)}
            style={{ display: isOpen ? "inline-block" : "none" }}
          >
            <i className="ti ti-x"></i>
          </button>
        </div>

        <div
          className="color-palate-inner"
          style={{ right: isOpen ? "0px" : "-280px" }}
        >
          <div className="group">
            <h6 className="not-cursor">Cursor</h6>
            <ul className="cursor-version">
              <li
                className={`cursor-pointer animated-cursor ${
                  cursor === "animated" ? "active" : ""
                }`}
                onClick={() => setCursor("animated")}
              >
                Animated
              </li>
              <li
                className={`box cursor-pointer default-cursor ${
                  cursor === "default" ? "active" : ""
                }`}
                onClick={() => setCursor("default")}
              >
                Default
              </li>
            </ul>
          </div>

          <div className="group">
            <h6 className="not-cursor">Direction</h6>
            <ul className="rtl-version">
              <li
                className={`cursor-pointer ltr-yes ${
                  direction === "ltr" ? "active" : ""
                }`}
                onClick={() => setDirection("ltr")}
              >
                LTR
              </li>
              <li
                className={`cursor-pointer ltr-no ${
                  direction === "rtl" ? "active" : ""
                }`}
                onClick={() => setDirection("rtl")}
              >
                RTL
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .mouseCursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.05s ease-out;
  }

  .cursor-outer {
    width: 30px;
    height: 30px;
    border: 2px solid #9cecfe;
    border-radius: 50%;
  }

  .cursor-inner {
    width: 8px;
    height: 8px;
    background-color: #9cecfe;
    border-radius: 50%;
  }
`;

export default MouseCursor;
