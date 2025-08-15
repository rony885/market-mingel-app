import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";

import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field!"),
  email: yup.string().required("Email is a required field!"),
  phone: yup.string().required("Phone is a required field!"),
  subject: yup.string().required("Subject is a required field!"),
  message: yup.string().required("Message is a required field!"),
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

const ContactInfo = () => {
  // data fetching
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  const [message, setMessage] = useState();

  // add
  const AddContactFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);
    formfield.append("email", values.email);
    formfield.append("phone", values.phone);
    formfield.append("subject", values.subject);
    formfield.append("message", values.message);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/contact_api/unpaginate_contact/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "Contact is successfuly created...");
        // navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        setMessage(error.message, "Error");
        console.log(error);
      });
  };

  const submitAddContactForm = async (
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
    <section
      className="contact"
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Wrapper>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-8">
              <div
                className="section__header text-center mb-55"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <span className="fw-6 secondary-text text-xl">
                  <strong>Contact,</strong> Us With Support
                </span>
                <h2 className="title-animation fw-6 mt-25 text-capitalize">
                  Let Us Help You
                </h2>
                <p className="mt-25 fs-5">
                  Get in touch with us for questions, feedback, or support.
                  We're here to assist with any service inquiries.
                </p>
              </div>
            </div>
          </div>
          <div className="row gutter-24">
            <div className="col-12 col-lg-5 col-xl-4">
              <div className="contact__content">
                <div
                  className="contact__content-single"
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  <div className="icon">
                    <i className="ti ti-map-pin"></i>
                  </div>
                  <div className="content">
                    <h6 className="fw-6 mb-5">Main Office</h6>
                    <div className="content-group">
                      <p>
                        <Link
                          style={{ textTransform: "capitalize" }}
                          to="https://maps.app.goo.gl/S2mWitN75TT53Sx68"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {unpaginate_setting && unpaginate_setting.address}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="contact__content-single mt-20"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="200"
                >
                  <div className="icon">
                    <i className="ti ti-mail-opened"></i>
                  </div>
                  <div className="content">
                    <h6 className="fw-6 mb-5">Email Address</h6>
                    <div className="content-group">
                      <p>
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
                </div>
                <div
                  className="contact__content-single mt-20"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="200"
                >
                  <div className="icon">
                    <i className="ti ti-phone-call"></i>
                  </div>
                  <div className="content">
                    <h6 className="fw-6 mb-5">Phone Number</h6>
                    <div className="content-group">
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
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7 col-xl-8">
              <div
                className="contact__form"
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay="200"
              >
                <div className="contact__form-intro">
                  <h5 className="title-animation neutral-top fw-6 text-capitalize">
                    Get In Touch
                  </h5>
                </div>
                <hr className="divider mt-30 mb-40" />
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={submitAddContactForm}
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
                        {/* <Input
                          values={values}
                          handleChange={handleChange}
                          touched={touched}
                          errors={errors}
                          label="Name"
                          variable="name"
                          type="text"
                        /> */}
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
                              isInvalid={!!touched.subject && !!errors.subject}
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
                              isInvalid={!!touched.message && !!errors.message}
                              isValid={touched.message && !errors.message}
                              required
                            />
                            <i className="fa-solid fa-comments mt-3"></i>
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {/* <Input
                          values={values}
                          handleChange={handleChange}
                          touched={touched}
                          errors={errors}
                          label="Name"
                          variable="name"
                          type="textarea"
                          isTextarea={true}
                          rows={7}
                        /> */}
                      </div>

                      <div className="form-cta mt-40">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          aria-label="submit message"
                          title="submit message"
                          className="btn--primary"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
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
    font-size: 12px;
    color: red;
  }

  .imgDiv {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }
  //formik css
`;

export default ContactInfo;
