import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  // video: yup.string(),
  fostering_access_text: yup
    .string()
    .required("Fostering Text is a required field!"),
  fostering_access_image: yup
    .mixed()
    .required("Fostering Image is a required field!"),
  connecting_globally_text: yup
    .string()
    .required("Connecting Globally Text is a required field!"),
  connecting_globally_image: yup
    .mixed()
    .required("Connecting Globally Image is a required field!"),
  managing_director_text: yup
    .string()
    .required("Managing Director Text is a required field!"),
  managing_director_image: yup
    .mixed()
    .required("Managing Director Image is a required field!"),
});

const validate = (values) => {
  let errors = {};
  return errors;
};

const Home = () => {
  const [message, setMessage] = useState();
  const [item, setItem] = useState({});

  const [showImage, setShowImage] = useState(null);
  const [showImage1, setShowImage1] = useState(null);
  const [showImage2, setShowImage2] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onImageChange1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowImage1(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowImage2(URL.createObjectURL(event.target.files[0]));
    }
  };

  // update
  const updatedValues = {
    // video: item.video ? item.video : "",
    fostering_access_text: item.fostering_access_text
      ? item.fostering_access_text
      : "",
    fostering_access_image: item.fostering_access_image
      ? item.fostering_access_image
      : "",
    connecting_globally_text: item.connecting_globally_text
      ? item.connecting_globally_text
      : "",
    connecting_globally_image: item.connecting_globally_image
      ? item.connecting_globally_image
      : "",
    managing_director_text: item.managing_director_text
      ? item.managing_director_text
      : "",
    managing_director_image: item.managing_director_image
      ? item.managing_director_image
      : "",
  };

  const UpdateHomeFunc = async (values) => {
    let formfield = new FormData();

    // formfield.append("video", values.video);
    formfield.append("number", values.number);
    formfield.append("fostering_access_text", values.fostering_access_text);
    formfield.append(
      "connecting_globally_text",
      values.connecting_globally_text
    );
    formfield.append("managing_director_text", values.managing_director_text);

    if (values.fostering_access_image !== item.fostering_access_image) {
      formfield.append("fostering_access_image", values.fostering_access_image);
    }
    if (values.connecting_globally_image !== item.connecting_globally_image) {
      formfield.append(
        "connecting_globally_image",
        values.connecting_globally_image
      );
    }
    if (values.managing_director_image !== item.managing_director_image) {
      formfield.append(
        "managing_director_image",
        values.managing_director_image
      );
    }

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/home_api/unpaginate_home/1/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "Home is successfuly updated...");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message, "Error");
      });
  };

  const submitHomeForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await UpdateHomeFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

  const updateHome = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/home_api/unpaginate_home/1/`
    );
    setItem(data && data);
    setShowImage(data.fostering_access_image);
    setShowImage1(data.connecting_globally_image);
    setShowImage2(data.managing_director_image);
  };

  useEffect(() => {
    updateHome();
  }, []);

  return (
    <Wrapper>
      <div className="page-content">
        <div className="container-xxl">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                  <h4 className="card-title flex-grow-1 fs-4">
                    <Link to="/">Dashboard</Link> | Hero
                  </h4>
                </div>

                <div className="card-body">
                  <Formik
                    enableReinitialize={true}
                    initialValues={updatedValues}
                    validationSchema={schema}
                    onSubmit={submitHomeForm}
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
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label
                                  htmlFor="product-name"
                                  className="form-label"
                                >
                                  Video
                                </label>
                                <input
                                  type="text"
                                  id="product-name"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-0">
                                <Form.Label className="labelText">
                                  Fostering Access Text
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    // as="textarea"
                                    name="fostering_access_text"
                                    id="fostering_access_text"
                                    value={values.fostering_access_text}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.fostering_access_text &&
                                      !!errors.fostering_access_text
                                    }
                                    isValid={
                                      touched.fostering_access_text &&
                                      !errors.fostering_access_text
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.fostering_access_text}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-4 imgDiv divv">
                                <Form.Label>
                                  Fostering Access Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="fostering_access_image"
                                  id="fostering_access_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "fostering_access_image",
                                      event.currentTarget.files[0]
                                    );
                                    onImageChange(event);
                                  }}
                                  isInvalid={
                                    !!touched.fostering_access_image &&
                                    !!errors.fostering_access_image
                                  }
                                  isValid={
                                    touched.fostering_access_image &&
                                    !errors.fostering_access_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.fostering_access_image}
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
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-0">
                                <Form.Label className="labelText">
                                  Connecting Globally Text
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    // as="textarea"
                                    name="connecting_globally_text"
                                    id="connecting_globally_text"
                                    value={values.connecting_globally_text}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.connecting_globally_text &&
                                      !!errors.connecting_globally_text
                                    }
                                    isValid={
                                      touched.connecting_globally_text &&
                                      !errors.connecting_globally_text
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.connecting_globally_text}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-4 imgDiv divv">
                                <Form.Label>
                                  Connecting Globally Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="connecting_globally_image"
                                  id="connecting_globally_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "connecting_globally_image",
                                      event.currentTarget.files[0]
                                    );
                                    onImageChange1(event);
                                  }}
                                  isInvalid={
                                    !!touched.connecting_globally_image &&
                                    !!errors.connecting_globally_image
                                  }
                                  isValid={
                                    touched.connecting_globally_image &&
                                    !errors.connecting_globally_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.connecting_globally_image}
                                </Form.Control.Feedback>

                                {showImage1 && (
                                  <div>
                                    <img
                                      alt="product preview img"
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        marginTop: "20px",
                                        borderRadius: "50%",
                                      }}
                                      src={showImage1}
                                    />
                                  </div>
                                )}
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-0">
                                <Form.Label className="labelText">
                                  Managing Director Text
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    // as="textarea"
                                    name="managing_director_text"
                                    id="managing_director_text"
                                    value={values.managing_director_text}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.managing_director_text &&
                                      !!errors.managing_director_text
                                    }
                                    isValid={
                                      touched.managing_director_text &&
                                      !errors.managing_director_text
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.managing_director_text}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-4 imgDiv divv">
                                <Form.Label>
                                  Managing Director Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="managing_director_image"
                                  id="managing_director_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "managing_director_image",
                                      event.currentTarget.files[0]
                                    );
                                    onImageChange2(event);
                                  }}
                                  isInvalid={
                                    !!touched.managing_director_image &&
                                    !!errors.managing_director_image
                                  }
                                  isValid={
                                    touched.managing_director_image &&
                                    !errors.managing_director_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.managing_director_image}
                                </Form.Control.Feedback>

                                {showImage2 && (
                                  <div>
                                    <img
                                      alt="product preview img"
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        marginTop: "20px",
                                        borderRadius: "50%",
                                      }}
                                      src={showImage2}
                                    />
                                  </div>
                                )}
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="p-3  my-3 rounded">
                          <div className="row justify-content-end g-2">
                            <div className="col-lg-2">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-outline-secondary w-100"
                              >
                                {isSubmitting ? "Loading..." : "Save Change"}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* message  */}
                        {message && (
                          <h2 className="text-center m-5 text-capitalize">
                            {message}
                          </h2>
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

export default Home;
