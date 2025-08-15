import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";

const TermsConditionsInfo = () => {
  // data fetching
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  return (
    <section className="game-details pt-120 pb-120">
      <div className="container">
        <div className="row gutter-40">
          <div className="col-12 col-xl-12">
            <div className="blog__details-card lottery-details__card">
              <div
                className="details__content lottery__poster"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <div className="content">
                  <p className="mt-20 mb-4">Terms & Conditions: </p>
                  <div
                    className="discriptionstyle"
                    dangerouslySetInnerHTML={{
                      __html:
                        unpaginate_setting &&
                        unpaginate_setting.terms_condition,
                    }}
                  ></div>
                </div>
              </div>

              <div className="details__content mt-40 mb-40">
                <hr className="divider" />
              </div>

              <div className="details__content details__footer">
                <div className="details-tag">
                  <div className="tag-header">
                    <p>
                      Follow <i className="ti ti-arrow-move-right"></i>
                    </p>
                  </div>
                  <div className="social">
                    <Link
                      to={unpaginate_setting && unpaginate_setting.fbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="share us on facebook"
                      title="facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      to={
                        unpaginate_setting && unpaginate_setting.instragramLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="share us on instagram"
                      title="instagram"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                    <Link
                      to={unpaginate_setting && unpaginate_setting.youtubeLink}
                      target="_blank"
                      aria-label="share us on twitter"
                      title="Twitter"
                    >
                      <i className="fab fa-x-twitter"></i>
                    </Link>

                    <Link
                      to={unpaginate_setting && unpaginate_setting.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="share us on linkedin"
                      title="linkedin"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsInfo;
