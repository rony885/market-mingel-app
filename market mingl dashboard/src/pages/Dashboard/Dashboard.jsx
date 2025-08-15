import React from "react";
import Footer from "../../components/Footer";

const Dashboard = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex flex-column h-100 p-3">
            <div className="d-flex flex-column flex-grow-1">
              <div className="row h-100">
                <div className="col-xxl-12">
                  <div className="row align-items-center justify-content-center h-100">
                    <div className="col-lg-10">
                      <div className="mx-auto text-center">
                        <img
                          src="/assets/images/maintenance-2.png"
                          alt=""
                          className="img-fluid my-3"
                          height="700"
                          width="700"
                        />
                      </div>
                      <h2 className="fw-bold text-center lh-base">
                        Welcome To Market Mingel International.
                      </h2>
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

export default Dashboard;
