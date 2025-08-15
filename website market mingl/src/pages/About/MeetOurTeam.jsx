import React, { useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useApiContext } from "../../context/ApiContext";

// const slideData = [
//   {
//     id: 1,
//     image: "/assets/images/about/1.jpeg",
//     name: "Salman Mahmood",
//     post: "Managing Director",
//     company: "Marketmingl International",
//     pdf: "/assets/images/pdf/Salman CV.pdf",
//   },
//   {
//     id: 2,
//     image: "/assets/images/about/3.png",
//     name: "Md. Rejwan Masud",
//     post: "Director, Business Operation",
//     company: "Marketmingl International",
//     pdf: "/assets/images/pdf/Rejwan CV.pdf",
//   },
//   {
//     id: 3,
//     image: "/assets/images/about/4.jpeg",
//     name: "Mahabubur Rahman",
//     post: "Executive Director",
//     company: "Marketmingl International",
//     pdf: "/assets/images/pdf/Nirob CV.pdf",
//   },
// ];

const MeetOurTeam = () => {
  // data fetching
  const { unpaginate_team, fetchUnpaginateTeam } = useApiContext();
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateTeam();
  }, [fetchUnpaginateTeam]);

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  return (
    <Wrapper>
      <section
        className="game"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-9">
              <div
                className="section__header text-center mb-55"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <span className="fw-6 secondary-text text-xl">
                  <strong>Meet</strong> Our Team
                </span>
                <h2
                  className="title-animation fw-6 mt-25 text-capitalize"
                  style={{
                    fontSize: "40px",
                    lineHeight: "45px",
                  }}
                >
                  Emphasizing collaboration and shared responsibility.
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="game__slider-inner">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000, // ✅ 3 seconds
                    disableOnInteraction: false,
                  }}
                  // loop={true}
                  loop={unpaginate_team && unpaginate_team.length > 3} // ✅ loop only if enough slides
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {unpaginate_team &&
                    unpaginate_team.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <div className="result__single">
                          <div className="thumb mt-20">
                            <img
                              src={slide.image}
                              alt={slide.name}
                              style={{
                                height: "400px",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "12px",
                              }}
                            />
                          </div>

                          <div className="content text-center">
                            <h5 className="fw-6 neutral-top mb-2">
                              {slide.name}
                            </h5>
                            <h5 className="fw-6 fs-5 mb-0">{slide.post}</h5>
                            <h5 className="fw-6 fs-5">
                              {unpaginate_setting && unpaginate_setting.name}
                            </h5>
                            <div className="cta mt-35">
                              <a
                                href={slide.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn--primary"
                              >
                                View Details
                                <i className="ti ti-arrow-narrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        {/* Background Images */}
        <div className="chart">
          <img src="/assets/images/vr.png" alt="Imagee" />
        </div>
        <div className="btc">
          <img src="/assets/images/btc-two.png" alt="Imagee" />
        </div>
        <div className="rocket">
          <img src="/assets/images/rocket.png" alt="Imagee" />
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  section.game {
    position: relative;
    z-index: 99;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999 !important;
    overflow-y: auto;
    padding: 20px;
  }

  .custom-modal {
    background: white;
    padding: 20px;
    max-width: 800px;
    width: 90%;
    border-radius: 10px;
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
  }

  .modal-close {
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 30px;
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .download-wrapper {
    text-align: center;
    margin-top: 20px;
  }

  .download-btn {
    background-color: #9cecfe;
    color: #000; /* Optional: dark text for contrast */
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: background 0.3s ease;
  }

  .download-btn:hover {
    background-color: #7cd6eb;
  }

  .custom-modal iframe {
    width: 100%;
    height: 400px; /* or auto-adjust with media query */
    border: none;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    .custom-modal iframe {
      height: 250px; /* Smaller height on small screens */
    }
  }
`;

export default MeetOurTeam;
