import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  post: "",
  pdf: "",
  image: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field!"),
  post: yup.string().required("Post is a required field!"),
  pdf: yup.mixed().required("Pdf is a required field!"),
  image: yup.mixed().required("Image is a required field!"),
});

const validate = (values) => {
  let errors = {};
  return errors;
};

const AboutTeamAdd = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const [showImage, setShowImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // add
  const AddTeamFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);
    formfield.append("post", values.post);
    if (values.pdf) {
      formfield.append("pdf", values.pdf);
    }
    if (values.image) {
      formfield.append("image", values.image);
    }

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/about_api/unpaginate_team/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "Team is successfuly created...");
        navigate("/about-team");
        window.location.reload(false);
      })
      .catch((error) => {
        setMessage(error.message, "Error");
      });
  };

  const submitAddTeamForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await AddTeamFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="page-content">
        <div className="container-xxl">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                  <h4 className="card-title flex-grow-1 fs-4">
                    <Link to="/">Dashboard</Link> | Add About Team
                  </h4>

                  <Link
                    to="/about-team"
                    className="btn btn-sm btn-primary fs-4"
                  >
                    About Team List
                  </Link>
                </div>

                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={submitAddTeamForm}
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
                      <FormikForm noValidate onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Name<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  isInvalid={!!touched.name && !!errors.name}
                                  isValid={touched.name && !errors.name}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.name}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Post<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="post"
                                  id="post"
                                  value={values.post}
                                  onChange={handleChange}
                                  isInvalid={!!touched.post && !!errors.post}
                                  isValid={touched.post && !errors.post}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.post}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3 imgDiv divv">
                              <Form.Label>
                                PDF
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="pdf"
                                id="pdf"
                                onChange={(event) => {
                                  setFieldValue(
                                    "pdf",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                isInvalid={!!touched.pdf && !!errors.pdf}
                                isValid={touched.pdf && !errors.pdf}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.pdf}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3 imgDiv divv">
                              <Form.Label>
                                Image
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="image"
                                id="image"
                                onChange={(event) => {
                                  setFieldValue(
                                    "image",
                                    event.currentTarget.files[0]
                                  );
                                  onImageChange(event);
                                }}
                                isInvalid={!!touched.image && !!errors.image}
                                isValid={touched.image && !errors.image}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.image}
                              </Form.Control.Feedback>

                              {showImage && (
                                <div>
                                  <img
                                    alt="product preview img"
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      marginTop: "20px",
                                      borderRadius: "50%",
                                    }}
                                    src={showImage}
                                  />
                                </div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="p-3  my-3 rounded">
                          <div className="row justify-content-end g-2">
                            <div className="col-lg-2">
                              <button
                                type="submit"
                                className="btn btn-outline-secondary w-100"
                                disabled={isSubmitting}
                              >
                                {isSubmitting
                                  ? "Submitting..."
                                  : "Add About Team"}
                              </button>
                            </div>
                            <div className="col-lg-2">
                              <button
                                type="reset"
                                className="btn btn-primary w-100"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
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
        </div>

        <Footer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  //formik css
  .invalid-feedback {
    font-size: 12px;
    color: #f5975f;
  }
  .imgDiv {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }
  //formik css
`;

export default AboutTeamAdd;
