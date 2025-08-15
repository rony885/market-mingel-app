import React, { useState } from "react";
import styled from "styled-components";

import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  attachment: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field!"),
  email: yup.string().required("Email is a required field!"),
  phone: yup.string().required("Phone is a required field!"),
  subject: yup.string().required("Subject is a required field!"),
  message: yup.string().required("Message is a required field!"),
  attachment: yup.mixed().required("Attachment is a required field!"),
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

  return errors;
};

const BusinnesProposal = () => {
  const [message, setMessage] = useState();

  // add
  const AddContactFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);
    formfield.append("email", values.email);
    formfield.append("phone", values.phone);
    formfield.append("subject", values.subject);
    formfield.append("message", values.message);
    if (values.attachment) {
      formfield.append("attachment", values.attachment);
    }

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/businessProposal_api/unpaginate_businessProposal/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(
          response.success,
          "Business Proposal is Successfuly Created..."
        );
        // navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        setMessage(error.message, "Error");
        console.log(error);
      });
  };

  const submitAddBusinessProposalForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await AddContactFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

  return (
    <section className="authentication pt-120 pb-120">
      <Wrapper>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 col-xl-6">
              <div
                className="authentication__inner"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <div className="authentication__content mt-80">
                  <span className="fw-6 secondary-text text-xl fs-3">
                    <strong>Let's</strong> Do it together!
                  </span>
                  <p>Share Your Business Proposal.</p>
                </div>

                <div className="authentication__form mt-55">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={submitAddBusinessProposalForm}
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
                        className="custom-form"
                        name="contactform"
                        id="contactform"
                      >
                        <div className="input-wrapper">
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">
                              Name <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-single">
                              <Form.Control
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!touched.name && !!errors.name}
                                isValid={touched.name && !errors.name}
                                required
                              />
                              <i className="fa-solid fa-user"></i>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="input-wrapper mt-30">
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">
                              Email <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-single">
                              <Form.Control
                                type="text"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!touched.email && !!errors.email}
                                isValid={touched.email && !errors.email}
                                required
                              />
                              <i className="fa-solid fa-envelope"></i>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="input-wrapper mt-30">
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone">
                              Number <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-single">
                              <Form.Control
                                type="text"
                                name="phone"
                                id="phone"
                                value={values.phone}
                                onChange={handleChange}
                                isInvalid={!!touched.phone && !!errors.phone}
                                isValid={touched.phone && !errors.phone}
                                required
                              />
                              <i className="fa-solid fa-phone"></i>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="input-wrapper mt-30">
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="attachment">
                              Attachment <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-single">
                              <Form.Control
                                type="file"
                                name="attachment"
                                id="attachment"
                                onChange={(event) => {
                                  setFieldValue(
                                    "attachment",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                isInvalid={
                                  !!touched.attachment && !!errors.attachment
                                }
                                isValid={
                                  touched.attachment && !errors.attachment
                                }
                                required
                              />
                              <i className="ti ti-paperclip attachment-icon"></i>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.attachment}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="input-wrapper mt-30">
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="subject">
                              Subject <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="input-single">
                              <Form.Control
                                type="text"
                                name="subject"
                                id="subject"
                                value={values.subject}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.subject && !!errors.subject
                                }
                                isValid={touched.subject && !errors.subject}
                                required
                              />
                              <i className="fa-solid fa-tag"></i>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.subject}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="input-wrapper mt-30">
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="message">
                              Message <span className="text-danger">*</span>
                            </Form.Label>
                            <div
                              className="input-single"
                              style={{ alignItems: "start" }}
                            >
                              <Form.Control
                                as="textarea"
                                name="message"
                                id="message"
                                rows="7"
                                value={values.message}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.message && !!errors.message
                                }
                                isValid={touched.message && !errors.message}
                                required
                              />
                              <i className="fa-solid fa-comments mt-3"></i>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="form-cta mt-40">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            aria-label="submit message"
                            title="submit message"
                            className="btn--primary"
                          >
                            {isSubmitting ? "Sending..." : "Send"}
                            <i className="ti ti-arrow-narrow-right"></i>
                          </button>
                        </div>

                        {/* message  */}
                        {message && (
                          <h2 className="text-center m-5">{message}</h2>
                        )}
                      </FormikForm>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
              <div
                className="authentication__thumb text-center d-lg-block"
                style={{
                  backgroundImage: `url("/assets/images/authentication/thumb-sm.png")`,
                }}
              >
                <div className="circle-img">
                  <img
                    src="/assets/images/authentication/circle.png"
                    alt="Imagee"
                  />
                </div>
                <div className="thumb">
                  <img
                    src="/assets/images/authentication/24.png"
                    alt="Imagee"
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay="200"
                  />
                </div>
                <div className="number-img">
                  <img
                    src="/assets/images/authentication/numbers.png"
                    alt="Imagee"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.section`
  .form-control:focus {
    background-color: transparent !important;
    color: #fff !important;
    outline: none !important;
    border-color: none !important;
  }
  .input-single .form-control:focus {
    outline: none;
    box-shadow: none;
  }

  //formik css
  .invalid-feedback {
    font-size: 14px;
    color: red;
  }

  .imgDiv {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }
  //formik css
`;

export default BusinnesProposal;
