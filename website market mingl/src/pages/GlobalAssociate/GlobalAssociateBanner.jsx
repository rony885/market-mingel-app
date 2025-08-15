import React from "react";
import { Link } from "react-router-dom";

const GlobalAssociateBanner = () => {
  return (
    <section className="common-banner">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="common-banner__content">
              <h2 className="title-animation neutral-top fw-6 text-capitalize">
                {" "}
                Global Associate
              </h2>
              <nav aria-label="breadcrumb" className="mt-16">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Global Associate
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-bg">
        <img src="/assets/images/banner/cmn-banner-bg.png" alt="Imagee" />
      </div>
      <div className="thumb-wrapper">
        <div className="thumb">
          <img src="/assets/images/banner/cmn-banner-thumb.png" alt="Imagee" />
        </div>

        <div className="rocket">
          <img src="/assets/images/banner/rocket.png" alt="Imagee" />
        </div>
      </div>

      <div className="point">
        <img src="/assets/images/banner/point.png" alt="Imagee" />
      </div>
      <div className="bg-r">
        <img src="/assets/images/banner/bg-r.png" alt="Imagee" />
      </div>
      <div className="bg-l">
        <img src="/assets/images/banner/bg-l.png" alt="Imagee" />
      </div>
    </section>
  );
};

export default GlobalAssociateBanner;
