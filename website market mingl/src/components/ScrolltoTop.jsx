// import React from "react";

// const ScrolltoTop = () => {
//   return (
//     <button
//       className="progress-wrap"
//       aria-label="scroll indicator"
//       title="back to top"
//     >
//       <span></span>
//       <svg
//         className="progress-circle svg-content"
//         width="100%"
//         height="100%"
//         viewBox="-1 -1 102 102"
//       >
//         <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
//       </svg>
//     </button>
//   );
// };

// export default ScrolltoTop;

import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styled from "styled-components";

const ScrolltoTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <Button onClick={scrollToTop}>
          <FaArrowUp />
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #ffba23;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #cab380;
  }
`;

export default ScrolltoTop;
