import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const Profile = ({ c_user }) => {
  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="bg-primary profile-bg rounded-top position-relative mx-n3 mt-n3">
                  <img
                    src={
                      c_user && c_user.image
                        ? `${process.env.REACT_APP_BASE_URL_2}/${c_user.image}`
                        : "/assets/images/user.jpg"
                    }
                    alt=""
                    className="avatar-xl border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5"
                  />
                </div>

                <div className="mt-5 d-flex flex-wrap align-items-center justify-content-between">
                  <div>
                    <h4 className="mb-1">
                      {`${
                        c_user.f_name !== undefined && c_user.f_name !== null
                          ? c_user.f_name
                          : ""
                      }` +
                        " " +
                        `${
                          c_user.l_name !== undefined && c_user.l_name !== null
                            ? c_user.l_name
                            : ""
                        }`}
                      {/* <i className="bx bxs-badge-check text-success align-middle"></i> */}
                    </h4>
                    <p className="mb-0 text-capitalize">
                      {c_user && c_user.role}
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2 my-2 my-lg-0">
                    <Link
                      to={`/user-edit/${c_user && c_user.id}`}
                      className="btn btn-outline-primary"
                    >
                      Edit Profile
                    </Link>

                    <Link
                      to="/change-password"
                      className="btn btn-outline-primary"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Personal Information</h4>
              </div>
              <div className="card-body">
                <div className="">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                      <iconify-icon
                        icon="solar:user-bold-duotone"
                        className="fs-20 text-secondary"
                      ></iconify-icon>
                    </div>
                    <p className="mb-0 fs-14">
                      First Name:{" "}
                      <span className="text-dark fw-semibold">
                        {c_user && c_user.f_name}
                      </span>
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                      <iconify-icon
                        icon="solar:user-bold-duotone"
                        className="fs-20 text-secondary"
                      ></iconify-icon>
                    </div>
                    <p className="mb-0 fs-14">
                      Last Name:{" "}
                      <span className="text-dark fw-semibold">
                        {c_user && c_user.l_name ? c_user.l_name : "-"}
                      </span>
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                      <iconify-icon
                        icon="solar:tag-bold-duotone"
                        className="fs-20 text-secondary"
                      ></iconify-icon>
                    </div>
                    <p className="mb-0 fs-14">
                      Username:{" "}
                      <span className="text-dark fw-semibold">
                        @{c_user && c_user.email}
                      </span>
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                      <iconify-icon
                        icon="solar:letter-bold-duotone"
                        className="fs-20 text-secondary"
                      ></iconify-icon>
                    </div>
                    <p className="mb-0 fs-14">
                      Email:
                      <Link to="#!" className="text-primary fw-semibold">
                        {" "}
                        {c_user && c_user.eemmaaiill}
                      </Link>
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                      <iconify-icon
                        icon="solar:phone-bold-duotone"
                        className="fs-20 text-secondary"
                      ></iconify-icon>
                    </div>
                    <p className="mb-0 fs-14">
                      Phone:{" "}
                      <span className="text-dark fw-semibold">
                        {c_user && c_user.phone}
                      </span>
                    </p>
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

export default Profile;
