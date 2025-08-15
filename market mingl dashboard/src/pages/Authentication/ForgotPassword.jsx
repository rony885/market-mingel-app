import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";

const initialValues = {
  eemmaaiill: "",
};

const schema = yup.object().shape({
  eemmaaiill: yup.string().required("Username is a required field!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.eemmaaiill) {
    errors.eemmaaiill = "Email is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
    errors.eemmaaiill = "Invalid Email!";
  }

  return errors;
};

const ForgotPassword = () => {
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const AddForgotFunc = async (values) => {
    let formfield = new FormData();

    // Append individual fields
    formfield.append("eemmaaiill", values.eemmaaiill);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/send_reset_otp/`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8; text/plain",
      },
      data: formfield,
    })
      .then((response) => {
        navigate("/reset-password");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);

        setMessage(
          error.response.data.eemmaaiill ||
            error.response.data.non_field_errors ||
            error.message,
          "Error"
        );
      });
  };

  const submitForgotForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true); // Disable button during submission
      await AddForgotFunc(values); // Ensure this function returns a promise
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

                  <h2 className="fw-bold fs-24">Forgot Password</h2>

                  <p className="text-muted mt-1 mb-4">
                    Enter your email address and we'll send you an email with
                    instructions to reset your password.
                  </p>

                  <div className="mb-1">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={schema}
                      onSubmit={submitForgotForm}
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
                          <div className="mb-4">
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
                              {isSubmitting ? "Sending..." : "Send"}
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

export default ForgotPassword;
