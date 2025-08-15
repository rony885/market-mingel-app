import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext.jsx";

const EmigrantServiceDetailsInfo = () => {
  // data fetching
  const { unpaginate_emigrantService, fetchUnpaginateEmigrantService } =
    useApiContext();

  const {
    unpaginate_emigrantService_category,
    fetchUnpaginateEmigrantSerCategory,
  } = useApiContext();

  // data fetching
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateEmigrantService();
  }, [fetchUnpaginateEmigrantService]);

  useEffect(() => {
    fetchUnpaginateEmigrantSerCategory();
  }, [fetchUnpaginateEmigrantSerCategory]);

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  const { id } = useParams();

  const findServiceDetails = unpaginate_emigrantService.find(
    (serviceDetails) => serviceDetails.id === Number(id) // ✅ Match as string
  );

  return (
    <section className="game-details pt-120 pb-120">
      <Wrapper>
        <div className="container">
          <div className="row gutter-40">
            <div className="col-12 col-xl-12">
              <div className="blog__details-card lottery-details__card">
                <div
                  className="details__content lottery__poster"
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  <div className="thumb">
                    <img
                      src={findServiceDetails && findServiceDetails.image}
                      alt="Imagee"
                      style={{ height: "200px" }}
                    />
                  </div>

                  <div className="content">
                    <h5 className="fw-6 title-animation text-capitalize">
                      {findServiceDetails && findServiceDetails.name} (&nbsp;
                      {unpaginate_emigrantService_category &&
                        unpaginate_emigrantService_category
                          .filter(
                            (item) =>
                              item.id ===
                              Number(
                                findServiceDetails &&
                                  findServiceDetails.category
                              )
                          )
                          .map((itemm) => {
                            return itemm.name;
                          })}
                      &nbsp;)
                    </h5>
                  </div>
                </div>
                <div className="details__content mt-40 mb-40">
                  <hr className="divider" />
                </div>
                <div
                  className="details__content"
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  <div
                    className="discriptionstyle"
                    dangerouslySetInnerHTML={{
                      __html:
                        findServiceDetails && findServiceDetails.decsription,
                    }}
                  ></div>
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
                        aria-label="share us on facebook"
                        title="facebook"
                      >
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                      <Link
                        to={
                          unpaginate_setting &&
                          unpaginate_setting.instragramLink
                        }
                        target="_blank"
                        aria-label="share us on instagram"
                        title="instagram"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                      <Link
                        to={
                          unpaginate_setting && unpaginate_setting.youtubeLink
                        }
                        target="_blank"
                        aria-label="share us on twitter"
                        title="Twitter"
                      >
                        <i className="fab fa-x-twitter"></i>
                      </Link>

                      <Link
                        to={
                          unpaginate_setting && unpaginate_setting.whatsappLink
                        }
                        target="_blank"
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
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.section``;

export default EmigrantServiceDetailsInfo;
