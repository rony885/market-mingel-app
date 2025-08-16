import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useApiContext } from "../context/ApiContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // data fetching
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  return (
    <Wrapper>
      <footer className="footer" style={{ marginTop: "0px" }}>
        <div className="container">
          <div
            className="row gutter-60 "
            style={{ paddingTop: "40px", paddingBottom: "40px" }}
          >
            <div className="col-12 col-lg-4 col-xl-4">
              <div
                className="footer__widget"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <div className="footer__widget-intro">
                  <Link to="/" className="logo">
                    <img
                      src="/assets/images/logo/MM 3D Logo.svg"
                      alt="Imagee"
                      style={{ width: "168px", height: "125px" }}
                    />
                  </Link>
                </div>
                <div className="footer__widget-content mt-25">
                  <p>
                    {unpaginate_setting && unpaginate_setting.footer_content}
                  </p>
                </div>
                <div className="social mt-35">
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
                    to={unpaginate_setting && unpaginate_setting.instragramLink}
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

            <div className="col-12 col-lg-4 col-xl-4">
              <div
                className="footer__widget"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="200"
              >
                <div className="footer__widget-intro">
                  <h6 className="fw-6 neutral-top">Quick Links</h6>
                </div>
                <div className="footer__widget-content mt-25">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/services">Our Services</Link>
                    </li>
                    <li>
                      <Link to="/global-associate">Global Associate</Link>
                    </li>
                    <li>
                      <Link to="/emigrant-division">Emigrant Service</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 col-xl-4 adrress">
              <div
                className="footer__widget"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="800"
              >
                <div className="footer__widget-intro">
                  <h6 className="fw-6 neutral-top">Get In Touch</h6>
                </div>
                <div className="footer__widget-content mt-25">
                  <div className="footer__widget-group">
                    <div className="icon">
                      <i className="ti ti-phone-call"></i>
                    </div>
                    <div className="content">
                      <p>
                        <Link
                          to={`tel:${
                            unpaginate_setting && unpaginate_setting.number
                          }`}
                        >
                          {unpaginate_setting && unpaginate_setting.number}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="footer__widget-group mt-16">
                    <div className="icon">
                      <i className="ti ti-mail-opened"></i>
                    </div>
                    <div className="content">
                      <p className="mt-4">
                        {/* <Link to="mailto:info@marketmingl.com"> */}
                        <Link
                          to={`mailto:${
                            unpaginate_setting && unpaginate_setting.email
                          }`}
                        >
                          {unpaginate_setting && unpaginate_setting.email}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="footer__widget-group mt-16">
                    <div className="icon">
                      <i className="ti ti-map-pin"></i>
                    </div>
                    <div className="content w-100">
                      <p className="w-100">
                        <Link
                          style={{ textTransform: "capitalize" }}
                          to="https://maps.app.goo.gl/S2mWitN75TT53Sx68"
                          // to={unpaginate_setting && unpaginate_setting.mapurl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {unpaginate_setting && unpaginate_setting.address}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="footer__copyright">
                <div className="row align-items-center gutter-20">
                  <div className="col-12 col-lg-5">
                    <div className="footer__copyright-content">
                      <p className="text-center text-lg-start">
                        Copyright &copy;{" "}
                        <span id="copyrightYear">{currentYear}</span>&nbsp;
                        <Link to="#">MarketMingl International</Link>. All
                        rights reserved.
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-lg-7">
                    <div className="footer__copyright-list">
                      <ul className="justify-content-center justify-content-lg-end">
                        <li>
                          <Link to="/help-support">Help & Support</Link>
                        </li>
                        <li>
                          <span></span>
                        </li>
                        <li>
                          <Link to="/terms-conditions">Terms & Conditions</Link>
                        </li>
                        <li>
                          <span></span>
                        </li>
                        <li>
                          <span></span>
                        </li>
                        <li>
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="left-thumb"
          data-aos="fade-right"
          data-aos-duration="600"
        >
          {/* <img src="/assets/images/footer/footer-left.png" alt="Imagee" /> */}
        </div>
        <div
          className="right-thumb"
          data-aos="fade-left"
          data-aos-duration="600"
          data-aos-delay="300"
        >
          <img src="/assets/images/footer/footer-right.png" alt="Imagee" />
        </div>
        <div className="arrow">
          <img src="/assets/images/footer/arrow.png" alt="Imagee" />
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .adrress .footer__widget-content .content p {
    max-width: 100% !important;
  }
  .adrress .footer__widget-content p {
    max-width: 100% !important;
  }
`;

export default Footer;
