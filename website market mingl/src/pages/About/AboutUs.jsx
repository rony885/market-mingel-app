import React, { useEffect } from "react";
import { useApiContext } from "../../context/ApiContext";

const AboutUs = () => {
  // data fetching
  const { unpaginate_about_us, fetchUnpaginateAboutUs } = useApiContext();

  useEffect(() => {
    fetchUnpaginateAboutUs();
  }, [fetchUnpaginateAboutUs]);

  return (
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
                  <strong>About</strong> Us
                </span>

                <p className="mt-25" style={{ textAlign: "justify" }}>
                  {unpaginate_about_us && unpaginate_about_us.about_us_text1}
                </p>
                <p className="mt-25" style={{ textAlign: "justify" }}>
                  {unpaginate_about_us && unpaginate_about_us.about_us_text2}
                </p>
                <p className="mt-25" style={{ textAlign: "justify" }}>
                  {unpaginate_about_us && unpaginate_about_us.about_us_text3}
                </p>
                <p className="mt-25" style={{ textAlign: "justify" }}>
                  {unpaginate_about_us && unpaginate_about_us.about_us_text4}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
            <div
              className="authentication__thumb text-center d-lg-block"
              style={{
                backgroundImage: `url(/assets/images/authentication/thumb-sm.png)`,
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
                  src={
                    unpaginate_about_us && unpaginate_about_us.about_us_image
                  }
                  alt="Imagee"
                  data-aos="zoom-in"
                  data-aos-duration="600"
                  data-aos-delay="200"
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
  );
};

export default AboutUs;
