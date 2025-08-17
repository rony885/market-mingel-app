import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useApiContext } from "../../context/ApiContext";

const Fostering = () => {
  // data fetching
  const { unpaginate_home, fetchUnpaginateHome } = useApiContext();

  useEffect(() => {
    fetchUnpaginateHome();
  }, [fetchUnpaginateHome]);

  return (
    <Wrapper>
      <section
        // className="discover pt-120 pb-190"
        className="discover"
        style={{
          backgroundImage: `url("/assets/images/discover/discover-bg.png")`,
        }}
      >
        <div className="container">
          <div className="row align-items-center rtl-header">
            <div className="col-12 col-lg-4 col-xl-5">
              <div className="discover__thumb d-flex justify-content-center">
                <div className="refer__thumb">
                  <div
                    className="thumb text-center"
                    data-aos="fade-right"
                    data-aos-duration="600"
                  >
                    <img
                      // src="/assets/images/discover/1.png"
                      src={
                        unpaginate_home &&
                        unpaginate_home.fostering_access_image
                      }
                      alt="Imagee"
                      className="responsive-img"
                      // style={{height: "300px"}}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7 offset-lg-1 col-xl-6 offset-xl-1">
              <div
                className="discover__content"
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay="200"
              >
                <div className="section__content text-start">
                  <span className="fw-6 secondary-text text-xl">
                    <strong>Why</strong> Choose Us!
                  </span>
                  <h2 className="title-animation fw-6 mt-25 text-capitalize">
                    {unpaginate_home && unpaginate_home.fostering_access_text}
                  </h2>

                  {/* <p className="mt-25"> </p> */}
                </div>

                <div className="mt-40">
                  <Link
                    to="/about"
                    aria-label="Read More"
                    title="Read More"
                    className="btn--primary"
                  >
                    LEARN MORE <i className="ti ti-arrow-narrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .responsive-img {
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  @media only screen and (max-width: 768px) {
    .discover__thumb {
      justify-content: center !important;
    }
    .discover__thumb img {
      width: 100% !important;
    }
  }
`;

export default Fostering;
