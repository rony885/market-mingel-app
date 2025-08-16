import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useApiContext } from "../../context/ApiContext";

const initialValues = {
  eemmaaiill: "",
  otp: "",
  new_password: "",
  confirm_password: "",
};

const schema = yup.object().shape({
  eemmaaiill: yup.string().required("OTP is a required field!"),
  otp: yup.string().required("OTP is a required field!"),
  new_password: yup.string().required("New Password is a required field!"),
  confirm_password: yup
    .string()
    .required("Confirm Password is a required field!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.eemmaaiill) {
    errors.eemmaaiill = "Email is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
    errors.eemmaaiill = "Invalid Email!";
  }

  if (!values.new_password) {
    errors.new_password = "Password is required!";
  } else if (values.new_password.length < 4) {
    errors.new_password = "Password is too short!";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required!";
  } else if (values.confirm_password.length < 4) {
    errors.confirm_password = "Confirm password is too short!";
  }

  return errors;
};

const ResetPassword = () => {
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const [message, setMessage] = useState();
  const navigate = useNavigate();

  // add
  const AddResetunc = async (values) => {
    let formfield = new FormData();

    formfield.append("eemmaaiill", values.eemmaaiill);
    formfield.append("otp", values.otp);
    formfield.append("new_password", values.new_password);
    formfield.append("confirm_password", values.confirm_password);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/reset_password/`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8; text/plain",
      },
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "User is successfuly created...");
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(
          error.response.data.eemmaaiill ||
            error.response.data.otp ||
            error.response.data.new_password ||
            error.response.data.confirm_password ||
            error.response.data.non_field_errors ||
            error.message,
          "Error"
        );
      });
  };

  const submitResetForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true); // Disable button during submission
      await AddResetunc(values); // Ensure this function returns a promise
      setSubmitting(false); // Re-enable button if necessary after submission
      // resetForm(); // Uncomment if you want to reset the form after submission
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false); // Re-enable button in case of an error
    }
  };

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="d-flex flex-column flex-grow-1">
        <div className="row h-100">
          <div className="col-xxl-7">
            <div className="row justify-content-center h-100">
              <div className="col-lg-6 py-lg-5">
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="auth-logo mb-4">
                    <Link to="/" className="logo-dark">
                      <img
                        src={unpaginate_setting.logo}
                        height="120"
                        alt="logo dark"
                      />
                    </Link>

                    <Link to="/" className="logo-light">
                      <img
                        src={unpaginate_setting.logo}
                        height="120"
                        alt="logo light"
                      />
                    </Link>
                  </div>

                  <h2 className="fw-bold fs-24">Genrate New Password</h2>

                  <p className="text-muted mt-1 mb-4">
                    We received your password reset request. Please enter the
                    One-Time Password (OTP) sent to your registered email to
                    proceed.
                  </p>

                  <div className="mb-1">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={schema}
                      onSubmit={submitResetForm}
                      validate={validate}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        setFieldValue,
                      }) => (
                        <FormikForm
                          noValidate
                          onSubmit={(e) => handleSubmit(e)}
                        >
                          <div className="mb-2">
                            <Form.Group className="form-outline">
                              <Form.Label>
                                Email
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="eemmaaiill"
                                  id="eemmaaiill"
                                  value={values.eemmaaiill}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.eemmaaiill && !!errors.eemmaaiill
                                  }
                                  isValid={
                                    touched.eemmaaiill && !errors.eemmaaiill
                                  }
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.eemmaaiill}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          <div className="mb-2">
                            <Form.Group className="form-outline">
                              <Form.Label>
                                OTP
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="otp"
                                  id="otp"
                                  value={values.otp}
                                  onChange={handleChange}
                                  isInvalid={!!touched.otp && !!errors.otp}
                                  isValid={touched.otp && !errors.otp}
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.otp}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          <div className="mb-2">
                            <Form.Group className="form-outline">
                              <Form.Label>
                                New Password
                                <span className="text-danger">*</span>
                              </Form.Label>

                              <InputGroup hasValidation>
                                {/* Uncomment and use the icon if needed */}
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type={passwordVisible1 ? "text" : "password"} // toggle between text and password
                                  name="new_password"
                                  id="new_password"
                                  value={values.new_password}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.new_password &&
                                    !!errors.new_password
                                  }
                                  isValid={
                                    touched.new_password && !errors.new_password
                                  }
                                  className="form-control"
                                />
                                <InputGroup.Text
                                  onClick={togglePasswordVisibility1}
                                  style={{ cursor: "pointer" }}
                                >
                                  {passwordVisible1 ? (
                                    <FaEyeSlash />
                                  ) : (
                                    <FaEye />
                                  )}
                                  {/* Toggle between icons */}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                  {errors.new_password}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          <div className="mb-4">
                            <Form.Group className="form-outline">
                              <Form.Label>
                                Confirm New Password
                                <span className="text-danger">*</span>
                              </Form.Label>

                              <InputGroup hasValidation>
                                {/* Uncomment and use the icon if needed */}
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type={passwordVisible2 ? "text" : "password"} // toggle between text and password
                                  name="confirm_password"
                                  id="confirm_password"
                                  value={values.confirm_password}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.confirm_password &&
                                    !!errors.confirm_password
                                  }
                                  isValid={
                                    touched.confirm_password &&
                                    !errors.confirm_password
                                  }
                                  className="form-control"
                                />
                                <InputGroup.Text
                                  onClick={togglePasswordVisibility2}
                                  style={{ cursor: "pointer" }}
                                >
                                  {passwordVisible2 ? (
                                    <FaEyeSlash />
                                  ) : (
                                    <FaEye />
                                  )}
                                  {/* Toggle between icons */}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                  {errors.confirm_password}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          {/* message  */}
                          {message && (
                            <h6 className="text-center my-4 m-2  text-capitalize">
                              {message}
                            </h6>
                          )}

                          <div className="mb-1 text-center d-grid">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Reseting..." : "Reset Password"}
                            </button>
                          </div>
                        </FormikForm>
                      )}
                    </Formik>
                  </div>

                  <p className="mt-auto text-danger text-center">
                    Back to
                    <Link to="/" className="text-dark fw-bold ms-1">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-5 d-none d-xxl-flex">
            <div className="card h-100 mb-0 overflow-hidden">
              <div className="d-flex flex-column h-100">
                <img
                  src="/assets/images/small/img-10.jpg"
                  alt=""
                  className="w-100 h-100"
                />
              </div>
            </div>
            {/* <!-- end card --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
