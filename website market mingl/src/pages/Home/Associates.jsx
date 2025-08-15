import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useApiContext } from "../../context/ApiContext";

const Associates = () => {
  // data fetching
  const { unpaginate_client, fetchUnpaginateClient } = useApiContext();

  useEffect(() => {
    fetchUnpaginateClient();
  }, [fetchUnpaginateClient]);

  return (
    <section
      className="lottery-details lottery-alternate lottery"
      style={{
        backgroundImage: "url('/assets/images/lottery-bg.png')",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container">
        <div
          className="row gutter-20 align-items-center mb-55 rtl-header"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="col-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="section__content">
              <span className="fw-6 secondary-text text-xl">
                <strong>Our</strong> Associates
              </span>
              <h2 className="title-animation fw-6 mt-25 text-capitalize">
                we value being surrounded by positive and capable people.
              </h2>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="row">
          <div className="col-12">
            <div className="lottery__type-wrapper mb-25">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                // loop={true}
                loop={unpaginate_client && unpaginate_client.length > 4} // only loop if enough slides
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".next-lottery",
                  prevEl: ".prev-lottery",
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  576: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {unpaginate_client &&
                  unpaginate_client.map((lotto) => (
                    <SwiperSlide key={lotto.id}>
                      <div className="lottery__type lt-type-two text-center d-flex flex-column align-items-center justify-content-center">
                        <div className="thumb mb-3">
                          <img
                            src={lotto.image}
                            alt="Imagee"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div className="slider-navigation">
                <button
                  type="button"
                  aria-label="prev slide"
                  title="prev slide"
                  className="prev-lottery slider-btn"
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button
                  type="button"
                  aria-label="next slide"
                  title="next slide"
                  className="next-lottery slider-btn"
                >
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Images */}
      <div className="left-thumb">
        <img src="/assets/images/right-wheel.png" alt="Imagee" />
      </div>
      <div className="right-thumb">
        <img src="/assets/images/left-wheel.png" alt="Imagee" />
      </div>
    </section>
  );
};

export default Associates;
