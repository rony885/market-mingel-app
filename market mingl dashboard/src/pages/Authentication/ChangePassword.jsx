import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // import eye icons
import Footer from "../../components/Footer";
import { useApiContext } from "../../context/ApiContext";

const initialValues = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const schema = yup.object().shape({
  old_password: yup.string().required("Old password is a required field!"),
  new_password: yup.string().required("New Password is a required field!"),
  confirm_new_password: yup
    .string()
    .required("Confirm Password is a required field!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.old_password) {
    errors.old_password = "Password is required!";
  } else if (values.old_password.length < 4) {
    errors.old_password = "Password is too short!";
  }

  if (!values.new_password) {
    errors.new_password = "Password is required!";
  } else if (values.new_password.length < 4) {
    errors.new_password = "Password is too short!";
  }

  if (!values.confirm_new_password) {
    errors.confirm_new_password = "Confirm password is required!";
  } else if (values.confirm_new_password.length < 4) {
    errors.confirm_new_password = "Confirm password is too short!";
  }

  return errors;
};

const ChangePassword = () => {
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  const togglePasswordVisibility3 = () => {
    setPasswordVisible3(!passwordVisible3);
  };

  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const aT = localStorage.getItem("marketmingl_Access_Token");

  // add
  const AddChangeFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("old_password", values.old_password);
    formfield.append("new_password", values.new_password);
    formfield.append("confirm_new_password", values.confirm_new_password);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/change_password/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aT}`,
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
          error.response.data.old_password ||
            error.response.data.new_password ||
            error.response.data.confirm_new_password ||
            error.response.data.non_field_errors ||
            error.response.data.error ||
            error.message,
          "Error"
        );
      });
  };

  const submitChangeForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true); // Disable button during submission
      await AddChangeFunc(values); // Ensure this function returns a promise
      setSubmitting(false); // Re-enable button if necessary after submission
      // resetForm(); // Uncomment if you want to reset the form after submission
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false); // Re-enable button in case of an error
    }
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="d-flex flex-column h-100 p-3">
                <div className="d-flex flex-column flex-grow-1">
                  <div className="row h-100">
                    <div className="col-xxl-12">
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

                            <h2 className="fw-bold fs-24">Change Password</h2>
                            <p className="text-muted mt-1 mb-4">
                              Change Your Password Here...
                            </p>

                            <div>
                              <Formik
                                initialValues={initialValues}
                                validationSchema={schema}
                                onSubmit={submitChangeForm}
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
                                      <Form.Group className="form-outline mb-2 col-12">
                                        <Form.Label>
                                          Old Password
                                          <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                          {/* Uncomment and use the icon if needed */}
                                          {/* <InputGroup.Text>@</InputGroup.Text> */}
                                          <Form.Control
                                            type={
                                              passwordVisible1
                                                ? "text"
                                                : "password"
                                            } // toggle between text and password
                                            name="old_password"
                                            id="old_password"
                                            value={values.old_password}
                                            onChange={handleChange}
                                            isInvalid={
                                              !!touched.old_password &&
                                              !!errors.old_password
                                            }
                                            isValid={
                                              touched.old_password &&
                                              !errors.old_password
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
                                            {errors.old_password}
                                          </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                    </div>

                                    <div className="mb-2">
                                      <Form.Group className="form-outline mb-2 col-12">
                                        <Form.Label>
                                          New Password
                                          <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                          {/* Uncomment and use the icon if needed */}
                                          {/* <InputGroup.Text>@</InputGroup.Text> */}
                                          <Form.Control
                                            type={
                                              passwordVisible2
                                                ? "text"
                                                : "password"
                                            } // toggle between text and password
                                            name="new_password"
                                            id="new_password"
                                            value={values.new_password}
                                            onChange={handleChange}
                                            isInvalid={
                                              !!touched.new_password &&
                                              !!errors.new_password
                                            }
                                            isValid={
                                              touched.new_password &&
                                              !errors.new_password
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
                                            {errors.new_password}
                                          </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                    </div>

                                    <div className="mb-4">
                                      <Form.Group className="form-outline mb-2 col-12">
                                        <Form.Label>
                                          Confirm New Password
                                          <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                          {/* Uncomment and use the icon if needed */}
                                          {/* <InputGroup.Text>@</InputGroup.Text> */}
                                          <Form.Control
                                            type={
                                              passwordVisible3
                                                ? "text"
                                                : "password"
                                            } // toggle between text and password
                                            name="confirm_new_password"
                                            id="confirm_new_password"
                                            value={values.confirm_new_password}
                                            onChange={handleChange}
                                            isInvalid={
                                              !!touched.confirm_new_password &&
                                              !!errors.confirm_new_password
                                            }
                                            isValid={
                                              touched.confirm_new_password &&
                                              !errors.confirm_new_password
                                            }
                                            className="form-control"
                                          />
                                          <InputGroup.Text
                                            onClick={togglePasswordVisibility3}
                                            style={{ cursor: "pointer" }}
                                          >
                                            {passwordVisible3 ? (
                                              <FaEyeSlash />
                                            ) : (
                                              <FaEye />
                                            )}
                                            {/* Toggle between icons */}
                                          </InputGroup.Text>
                                          <Form.Control.Feedback type="invalid">
                                            {errors.confirm_new_password}
                                          </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                    </div>

                                    {/* message  */}
                                    {message && (
                                      <h6 className="text-center my-4 m-2 ">
                                        {message}
                                      </h6>
                                    )}

                                    <div className="mb-1 text-center d-grid">
                                      <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                      >
                                        {isSubmitting
                                          ? "Changing..."
                                          : "Change Password"}
                                      </button>
                                    </div>
                                  </FormikForm>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default ChangePassword;
