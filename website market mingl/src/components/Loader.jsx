// import React from "react";

// const Loader = () => {
//   return (
//     <div className="preloader">
//       <i className="ti ti-device-gamepad-2"></i>
//       <p>Market Mingel International</p>
//     </div>
//   );
// };

// export default Loader;

import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <Wrapper>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0e121d;

  .bar {
    width: 10px;
    height: 40px;
    margin: 0 5px;
    background-color: #9cecfe;
    animation: wave 1.2s infinite ease-in-out;
  }

  .bar:nth-child(1) {
    animation-delay: 0s;
  }
  .bar:nth-child(2) {
    animation-delay: 0.1s;
  }
  .bar:nth-child(3) {
    animation-delay: 0.2s;
  }
  .bar:nth-child(4) {
    animation-delay: 0.3s;
  }
  .bar:nth-child(5) {
    animation-delay: 0.4s;
  }

  @keyframes wave {
    0%,
    100% {
      transform: scaleY(0.3);
    }
    50% {
      transform: scaleY(1);
    }
  }
`;

export default Loader;

// import React from "react";
// import styled from "styled-components";

// const Loader = () => {
//   return (
//     <Wrapper>
//       <div className="preloader">
//         <i className="ti ti-device-gamepad-2"></i>
//         <p>Market Mingel International</p>
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #0e121d;

//   .preloader {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center; /* ensures vertical centering within .preloader */
//     text-align: center;
//     color: #9cecfe;
//     animation: fadeInUp 1s ease-in-out infinite alternate;
//   }

//   .preloader i {
//     font-size: 50px;
//     display: block;
//     margin-bottom: 10px;
//     animation: bounce 1.5s infinite ease-in-out;
//   }

//   .preloader p {
//     font-size: 18px;
//     font-weight: 600;
//     letter-spacing: 1px;
//     color: #ffffff;
//   }

//   @keyframes fadeInUp {
//     0% {
//       opacity: 0.5;
//       transform: translateY(10px);
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   @keyframes bounce {
//     0%,
//     100% {
//       transform: translateY(0px);
//     }
//     50% {
//       transform: translateY(-10px);
//     }
//   }
// `;

// export default Loader;
