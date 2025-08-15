import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";

const VisionMssion = () => {
  // data fetching
  const { unpaginate_about_us, fetchUnpaginateAboutUs } = useApiContext();

  useEffect(() => {
    fetchUnpaginateAboutUs();
  }, [fetchUnpaginateAboutUs]);

  return (
    <Wrapper>
      <section
        className="refer refer-alter"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="container">
          <div className="row align-items-center rtl-header">
            <div className="col-12 col-lg-6 col-xl-6">
              <div
                className="refer__content"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <div className="section__content text-start">
                  <span className="fw-6 secondary-text text-xl">
                    <strong>Vision</strong> & Mission
                  </span>
                </div>

                <div className="refer__content-single mt-5">
                  <p className="text-xl fw-5">
                    <i
                      className="fa-solid fa-circle-arrow-right"
                      style={{ color: "#FFBA23" }}
                    ></i>{" "}
                    Our Vision:
                  </p>
                  <p
                    className="text-sm mt-8"
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    {unpaginate_about_us && unpaginate_about_us.vission}
                  </p>
                </div>

                <div className="refer__content-single mt-5">
                  <p className="text-xl fw-5">
                    <i
                      className="fa-solid fa-circle-arrow-right"
                      style={{ color: "#FFBA23" }}
                    ></i>{" "}
                    Our Mission:
                  </p>
                  <p
                    className="text-sm mt-8"
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    {unpaginate_about_us && unpaginate_about_us.mission}
                  </p>
                </div>

                <div className="mt-40">
                  <Link
                    to="#"
                    aria-label="join now"
                    title="join now"
                    className="btn--primary"
                  >
                    Join Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 d-flex justify-content-center">
              <div
                className="thumb text-center"
                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-delay="200"
              >
                <img
                  src={
                    unpaginate_about_us &&
                    unpaginate_about_us.vission_mission_image
                  }
                  alt="Imagee"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="left-thumb">
          <img src="/assets/images/faq/left-thumb.png" alt="Imagee" />
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media only screen and (max-width: 768px) {
    .thumb {
      display: flex;
      justify-content: center;
    }
  }
`;

export default VisionMssion;
