import React, { useEffect } from "react";
import styled from "styled-components";
import { useApiContext } from "../../context/ApiContext";

const ChairmanMessage = () => {
  // data fetching
  const { unpaginate_about_us, fetchUnpaginateAboutUs } = useApiContext();

  useEffect(() => {
    fetchUnpaginateAboutUs();
  }, [fetchUnpaginateAboutUs]);

  return (
    <Wrapper>
      <section
        className="testimonial"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-7 col-xl-5 mb-4 mb-lg-0">
              <div className="testimonial__thumb">
                <div className="right-thumb text-start">
                  <div className="right__thumb__inner">
                    <img
                      src="/assets/images/about/2.jpeg"
                      alt="Imagee"
                      data-aos="zoom-in"
                      data-aos-duration="600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 col-xl-6 offset-xl-1">
              <div className="testimonial__content">
                <div className="section__content text-start mb-40 w-100">
                  <span className="fw-6 secondary-text text-xl w-100">
                    <strong>Chairman</strong> Message
                  </span>
                  <h2 className="title-animation fw-6 mt-25 fs-4 text-capitalize">
                    {unpaginate_about_us &&
                      unpaginate_about_us.chairman_message_text1}
                  </h2>
                  <h2
                    className="fw-6 mt-20 fs-5"
                    style={{
                      lineHeight: "30px",
                      marginBottom: "0",
                      textAlign: "justify",
                    }}
                  >
                    {unpaginate_about_us &&
                      unpaginate_about_us.chairman_message_text2}
                  </h2>
                </div>

                <div className="content mb-40">
                  <p
                    className="text-xl fw-6"
                    style={
                      {
                        textAlign: "justify",
                      }
                    }
                  >
                    {unpaginate_about_us &&
                      unpaginate_about_us.chairman_message_text3}
                  </p>
                </div>

                <div className="content">
                  <p className="text-xl fw-6 text-capitalize">
                    {unpaginate_about_us &&
                      unpaginate_about_us.chairman_message_text4}
                  </p>
                  <p
                    className="text-capitalize"
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    Bangladesh Army (Commissioned in 1969 self retired 1982)
                    Ministry of Civil Aviation (1983 to 2006) Ultimately
                    retiring in 2006 as Managing Director Biman Bangladesh
                    Airlines.
                  </p>
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
    .testimonial__thumb {
      display: flex;
      justify-content: center;
    }

    .right-thumb {
      text-align: center;
    }

    .right__thumb__inner img {
      max-width: 100%;
      height: 550px !important;
    }
  }
`;

export default ChairmanMessage;
