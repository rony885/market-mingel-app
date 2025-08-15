
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Connecting = () => {
  return (
    <Wrapper>
      <section
        className="about about-alternate"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 col-xl-6">
              <div
                className="about__content"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <div className="section__content text-start">
                  <span className="fw-6 secondary-text text-xl">
                    <strong>Trusted</strong> by Thousands of Renowned Company
                  </span>
                  <h2 className="title-animation fw-6 mt-25 text-capitalize">
                    Connecting Globally And Collaborations Across Borders
                  </h2>
                </div>

                <div className="mt-40">
                  <Link
                    to="/global-associate"
                    aria-label="Play Lottery"
                    title="Play Lottery"
                    className="btn--primary"
                  >
                    DISCOVER MORE <i className="ti ti-arrow-narrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
              <div
                className="authentication__thumb text-center d-lg-block"
                style={{
                  backgroundImage: `url("/assets/images/authentication/thumb-sm.png")`,
                }}
              >
                <div className="circle-img">
                  <img
                    src="/assets/images/authentication/circle.png"
                    alt="Imagee"
                  />
                </div>
                <div className="thumb">
                  <img
                    // src="/assets/images/authentication/thumb.png"
                    src="/assets/images/authentication/4.png"
                    alt="Imagee"
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay="200"
                    // style={{ height: "500px", width: "100%" }}
                  />
                </div>
                <div className="number-img">
                  <img
                    src="/assets/images/authentication/numbers.png"
                    alt="Imagee"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="left-thumb">
          <img src="/assets/images/spring.png" alt="Imagee" />
        </div>
        <div className="rocket">
          <img src="/assets/images/rocket-sm.png" alt="Imagee" />
        </div>
      </section>

  
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* Base image style */
  .responsive-thumb-img {
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
  }

  /* Optional: If you want it to take full height too inside its container */
  @media (max-width: 768px) {
    .authentication__thumb {
      background: none !important;
      padding: 0;
      margin-top: 30px;
    }

    .responsive-thumb-img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`;

export default Connecting;
