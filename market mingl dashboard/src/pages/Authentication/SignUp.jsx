import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // import eye icons
import { useApiContext } from "../../context/ApiContext";

const initialValues = {
  email: "",
  f_name: "",
  l_name: "",
  // role: "",
  phone: "",
  eemmaaiill: "",
  password: "",
  confirm_password: "",
};

const schema = yup.object().shape({
  email: yup.string().required("Username is a required field!"),
  f_name: yup.string().required("First name is a required field!"),
  l_name: yup.string(),
  // role: yup.string().required("Role is a required field!"),
  phone: yup.string().required("Phone is a required field!"),
  eemmaaiill: yup.string().required("Email is a required field!"),
  password: yup.string().required("Password is a required field!"),
  confirm_password: yup
    .string()
    .required("Confirm Password is a required field!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.phone) {
    errors.phone = "Phone is required!";
  } else if (/^[0-9\b]+$/.test(values.phone) === false) {
    errors.phone = "Only number!";
  } else if (values.phone.length !== 11) {
    errors.phone = "Mobile Number contains 11 digit!";
  }

  if (!values.eemmaaiill) {
    errors.eemmaaiill = "Email is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
    errors.eemmaaiill = "Invalid Email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 4) {
    errors.password = "Password is too short!";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required!";
  } else if (values.confirm_password.length < 4) {
    errors.confirm_password = "Confirm password is too short!";
  }

  return errors;
};

const SignUp = () => {
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
  const AddRegFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("email", values.email);
    formfield.append("f_name", values.f_name);
    formfield.append("l_name", values.l_name);
    formfield.append("role", "staff");
    formfield.append("phone", values.phone);
    formfield.append("eemmaaiill", values.eemmaaiill);

    formfield.append("is_staff", true);
    formfield.append("password", values.password);
    formfield.append("confirm_password", values.confirm_password);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/register/`,
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
          error.response.data.email ||
            error.response.data.phone ||
            error.response.data.eemmaaiill ||
            error.response.data.password ||
            error.response.data.confirm_password ||
            error.response.data.non_field_errors ||
            error.message,
          "Error"
        );
      });
  };

  const submitRegisterForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true); // Disable button during submission
      await AddRegFunc(values); // Ensure this function returns a promise
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

                  <h2 className="fw-bold fs-24">Sign Up</h2>

                  <p className="text-muted mt-1 mb-4">
                    New to our platform? Sign up now! It only takes a minute
                  </p>

                  <div className="mb-1">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={schema}
                      onSubmit={submitRegisterForm}
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
                                Username
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  isInvalid={!!touched.email && !!errors.email}
                                  isValid={touched.email && !errors.email}
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          <div className="row">
                            <div className="mb-2 col-6">
                              <Form.Group className="form-outline">
                                <Form.Label>
                                  First Name
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                                  <Form.Control
                                    type="text"
                                    name="f_name"
                                    id="f_name"
                                    value={values.f_name}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.f_name && !!errors.f_name
                                    }
                                    isValid={touched.f_name && !errors.f_name}
                                    className="form-control"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.f_name}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>

                            <div className="mb-2 col-6">
                              <Form.Group className="form-outline">
                                <Form.Label>
                                  Last Name<span></span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                                  <Form.Control
                                    type="text"
                                    name="l_name"
                                    id="l_name"
                                    value={values.l_name}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.l_name && !!errors.l_name
                                    }
                                    isValid={touched.l_name && !errors.l_name}
                                    className="form-control"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.l_name}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="row">
                            <div className="mb-2 col-6">
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
                                      !!touched.eemmaaiill &&
                                      !!errors.eemmaaiill
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

                            <div className="mb-2 col-6">
                              <Form.Group className="form-outline">
                                <Form.Label>
                                  Phone
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                                  <Form.Control
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.phone && !!errors.phone
                                    }
                                    isValid={touched.phone && !errors.phone}
                                    className="form-control"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="row">
                            <div className="mb-2 col-6">
                              <Form.Group className="form-outline">
                                <Form.Label>
                                  Password
                                  <span className="text-danger">*</span>
                                </Form.Label>

                                <InputGroup hasValidation>
                                  {/* Uncomment and use the icon if needed */}
                                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                                  <Form.Control
                                    type={
                                      passwordVisible1 ? "text" : "password"
                                    } // toggle between text and password
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.password && !!errors.password
                                    }
                                    isValid={
                                      touched.password && !errors.password
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
                                    {errors.password}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>

                            <div className="mb-4 col-6">
                              <Form.Group className="form-outline">
                                <Form.Label>
                                  Confirm Password
                                  <span className="text-danger">*</span>
                                </Form.Label>

                                <InputGroup hasValidation>
                                  {/* Uncomment and use the icon if needed */}
                                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                                  <Form.Control
                                    type={
                                      passwordVisible2 ? "text" : "password"
                                    } // toggle between text and password
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
                          </div>

                          {/* message  */}
                          {message && (
                            <h6 className="text-center my-4 m-2  text-capitalize">
                              {message}
                            </h6>
                          )}

                          <div className="mb-1 text-center d-grid">
                            <button
                              className="btn btn-soft-primary"
                              type="submit"
                              // disabled={isSubmitting}
                              disabled
                            >
                              {isSubmitting ? "Submitting..." : "Register"}
                            </button>
                          </div>
                        </FormikForm>
                      )}
                    </Formik>
                  </div>

                  <p className="mt-auto text-danger text-center">
                    I already have an account
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

export default SignUp;
