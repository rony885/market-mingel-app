import React, { useEffect } from "react";
import { useApiContext } from "../../context/ApiContext";

const EmigrantServiceUsOthers = () => {
  // data fetching
  const {
    unpaginate_emigrantService_content,
    fetchUnpaginateEmigrantServiceContent,
  } = useApiContext();

  useEffect(() => {
    fetchUnpaginateEmigrantServiceContent();
  }, [fetchUnpaginateEmigrantServiceContent]);

  return (
    <section
      className="about about-alternate"
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
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
                <span className="fw-6 secondary-text text-xl mb-4">
                  <strong>Our</strong> speciality
                </span>

                <div
                  className="discriptionstyle"
                  dangerouslySetInnerHTML={{
                    __html:
                      unpaginate_emigrantService_content.our_speciality_text,
                  }}
                ></div>

                {/* <p className="mt-25 mb-0">Our visa team specializes in: </p>
                <ul
                  className="mt-10"
                  style={{ listStyle: "none", paddingLeft: 0 }}
                >
                  <li>
                    ✅ Legal Work Permits (Serbia, Romania, Hungary, Poland,
                    Italy, etc.){" "}
                  </li>
                  <li>
                    ✅ Tourist & Visit Visas for Asia, Europe, UAE, and beyond{" "}
                  </li>
                  <li>
                    ✅ Student Visa applications and university admission
                    guidance
                  </li>
                  <li>
                    ✅ Business Visas for global trade and investment
                    opportunities
                  </li>
                </ul>
                <p className="mt-25">
                  We also offer BMET registration, embassy coordination, and
                  document legalization services to make your overseas journey
                  smooth and secure.
                </p> */}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
            <div
              className="authentication__thumb text-center d-lg-block"
              style={{
                backgroundImage: `url(/assets/images/authentication/thumb-sm.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
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
                    unpaginate_emigrantService_content &&
                    unpaginate_emigrantService_content.our_speciality_text_image
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

export default EmigrantServiceUsOthers;
