import React, { useEffect } from "react";
import styled from "styled-components";
import { useApiContext } from "../../context/ApiContext";

const Manpower = () => {
  // data fetching
  const { unpaginate_about_us, fetchUnpaginateAboutUs } = useApiContext();

  useEffect(() => {
    fetchUnpaginateAboutUs();
  }, [fetchUnpaginateAboutUs]);

  return (
    <Wrapper>
      <section
        className="testimonial"
        style={{ paddingTop: "0px", paddingBottom: "40px", marginTop: "0px" }}
      >
        <div className="container">
          <div
            className="section__header text-center"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <span className="fw-6 secondary-text text-xl">
              <strong>Industries</strong> We Serve
            </span>
          </div>
          <br />

          <div className="row align-items-center">
            <div className="col-12 col-lg-7 col-xl-6 offset-xl-1">
              <div className="testimonial__content">
                <div className="section__content text-center mb-40 d-flex justify-content-center align-items-center flex-column gap-2">
                  <span className="fw-6 secondary-text text-xl">
                    <strong>
                      {unpaginate_about_us &&
                        unpaginate_about_us.manpower_text1}
                    </strong>
                  </span>
                  <span className="fw-6 secondary-text text-xl">
                    <strong>
                      {unpaginate_about_us &&
                        unpaginate_about_us.manpower_text2}
                    </strong>
                  </span>
                  <span className="fw-6 secondary-text text-xl">
                    <strong>
                      {" "}
                      {unpaginate_about_us &&
                        unpaginate_about_us.manpower_text3}
                    </strong>
                  </span>
                  <span className="fw-6 secondary-text text-xl">
                    <strong>
                      {" "}
                      {unpaginate_about_us &&
                        unpaginate_about_us.manpower_text4}
                    </strong>
                  </span>
                  <span className="fw-6 secondary-text text-xl">
                    <strong>
                      {" "}
                      {unpaginate_about_us &&
                        unpaginate_about_us.manpower_text5}
                    </strong>
                  </span>
                  <span className="fw-6 secondary-text text-xl">
                    <strong>
                      {" "}
                      {unpaginate_about_us &&
                        unpaginate_about_us.manpower_text6}
                    </strong>
                  </span>
                </div>

                {/* <div className="testimonial__slider swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="testimonial__slider-single">
                        <div className="content"></div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-12 col-lg-5 col-xl-5 d-flex justify-content-center">
              <div className="testimonial__thumb d-lg-block">
                <div className="right-thumb text-end">
                  <div className="right__thumb__inner">
                    <img
                      src={
                        unpaginate_about_us &&
                        unpaginate_about_us.manpower_image
                      }
                      alt="Imagee"
                      data-aos="zoom-in"
                      data-aos-duration="600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="left-bottom"
          data-aos="fade-right"
          data-aos-duration="600"
        >
          <img src="/assets/images/art.png" alt="Imagee" />
        </div>
        <div
          className="right-bottom"
          data-aos="fade-left"
          data-aos-duration="600"
          data-aos-delay="300"
        >
          <img src="/assets/images/square.png" alt="Imagee" />
        </div>

        <div className="left-thumb-th">
          <img src="/assets/images/left-th.png" alt="Imagee" />
        </div>
        <div className="chart-thumb">
          <img src="/assets/images/chart.png" alt="Imagee" />
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

export default Manpower;
