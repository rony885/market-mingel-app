import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5">
            <div className="card">
              <div className="card-body px-3 py-4">
                <div className="row align-items-center justify-content-center h-100">
                  <div className="col-lg-10">
                    <div className="mx-auto text-center">
                      <img
                        src="/assets/images/404-error.png"
                        alt=""
                        className="img-fluid my-3"
                      />
                    </div>
                    <h3 className="fw-bold text-center lh-base">
                      Ooops! The Page You're Looking For Was Not Found
                    </h3>
                    <p className="text-muted text-center mt-1 mb-4">
                      Sorry, we couldn't find the page you were looking for. We
                      suggest that you return to main sections
                    </p>
                    <div className="text-center">
                      <Link to="/" className="btn btn-primary">
                        Back To Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
