// import React from "react";

// const TemplateOption = () => {
//   return (
//     <div className="color-palate">
//       <div className="color-icon">
//         <button className="open-color">
//           <i className="ti ti-settings-filled"></i>
//         </button>
//         <button className="close-color">
//           <i className="ti ti-x"></i>
//         </button>
//       </div>
//       <div className="color-palate-inner">
//         <div className="group">
//           <h6 className="not-cursor">Cursor</h6>
//           <ul className="cursor-version">
//             <li className="active cursor-pointer animated-cursor">Animated</li>
//             <li className="box cursor-pointer default-cursor">Default</li>
//           </ul>
//         </div>
//         <div className="group">
//           <h6 className="not-cursor">Direction</h6>
//           <ul className="rtl-version">
//             <li className="active cursor-pointer ltr-yes">LTR</li>
//             <li className="cursor-pointer ltr-no">RTL</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateOption;

import React, { useState } from "react";
import styled from "styled-components";

const TemplateOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState("animated");
  const [direction, setDirection] = useState("ltr");

  return (
    <Wrapper>
      <div className="color-palate">
        {/* Toggle Buttons */}
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

        {/* Side Panel */}
        <div
          className="color-palate-inner"
          style={{ right: isOpen ? "0px" : "-280px" }}
        >
          {/* Cursor Option */}
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

          {/* Direction Option */}
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

const Wrapper = styled.section``;

export default TemplateOption;
