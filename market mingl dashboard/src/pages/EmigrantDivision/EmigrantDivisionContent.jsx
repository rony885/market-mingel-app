import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

import JoditEditor from "jodit-react";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  visa_expert_title: yup
    .string()
    .required("Visa expert title is a required field!"),
  visa_expert_name_1: yup
    .string()
    .required("visa expert name_1 is a required field!"),
  visa_expert_post_1: yup
    .string()
    .required("visa expert post_1 is a required field!"),
  visa_expert_name_2: yup
    .string()
    .required("visa expert name_2 is a required field!"),
  visa_expert_post_2: yup
    .string()
    .required("visa expert post_2 is a required field!"),
  emigrant_expert_text: yup.string(),
  our_speciality_text: yup.string(),
  visa_expert_image_1: yup
    .mixed()
    .required("Visa expert image_1 is a required field!"),
  visa_expert_image_2: yup
    .mixed()
    .required("Visa expert image_2 is a required field!"),
  emigrant_expert_text_image: yup
    .mixed()
    .required("Emigrant expert text image is a required field!"),
  our_speciality_text_image: yup
    .mixed()
    .required("Our speciality text image is a required field!"),
});

const validate = (values) => {
  let errors = {};

  return errors;
};

const EmigrantDivisionContent = () => {
  const [message, setMessage] = useState();
  const [item, setItem] = useState({});

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const editor1 = useRef(null);
  const [content1, setContent1] = useState("");

  const [visaExpertImg1, setVisaExpertImg1] = useState(null);
  const [visaExpertImg2, setVisaExpertImg2] = useState(null);
  const [emigrantExpertImg, setEmigranExpertImg] = useState(null);
  const [ourspecialityImg, setOurSpecialityImg] = useState(null);

  const onVisaExpertImg1Change = (event) => {
    if (event.target.files && event.target.files[0]) {
      setVisaExpertImg1(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onVisaExpertImg2Change = (event) => {
    if (event.target.files && event.target.files[0]) {
      setVisaExpertImg2(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onEmigrantExpertImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEmigranExpertImg(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onOurSpecialityImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setOurSpecialityImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // update
  const updatedValues = {
    visa_expert_title: item.visa_expert_title ? item.visa_expert_title : "",
    visa_expert_name_1: item.visa_expert_name_1 ? item.visa_expert_name_1 : "",
    visa_expert_post_1: item.visa_expert_post_1 ? item.visa_expert_post_1 : "",
    visa_expert_name_2: item.visa_expert_name_2 ? item.visa_expert_name_2 : "",
    visa_expert_post_2: item.visa_expert_post_2 ? item.visa_expert_post_2 : "",
    emigrant_expert_text: item.emigrant_expert_text
      ? item.emigrant_expert_text
      : "",
    our_speciality_text: item.our_speciality_text
      ? item.our_speciality_text
      : "",

    visa_expert_image_1: item.visa_expert_image_1
      ? item.visa_expert_image_1
      : "",
    visa_expert_image_2: item.visa_expert_image_2
      ? item.visa_expert_image_2
      : "",
    emigrant_expert_text_image: item.emigrant_expert_text_image
      ? item.emigrant_expert_text_image
      : "",
    our_speciality_text_image: item.our_speciality_text_image
      ? item.our_speciality_text_image
      : "",
  };

  const UpdateEmigrantServiceFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("visa_expert_title", values.visa_expert_title);
    formfield.append("visa_expert_name_1", values.visa_expert_name_1);
    formfield.append("visa_expert_post_1", values.visa_expert_post_1);
    formfield.append("visa_expert_name_2", values.visa_expert_name_2);
    formfield.append("visa_expert_post_2", values.visa_expert_post_2);
    formfield.append("emigrant_expert_text", content);
    formfield.append("our_speciality_text", content1);

    if (values.visa_expert_image_1 !== item.visa_expert_image_1) {
      formfield.append("visa_expert_image_1", values.visa_expert_image_1);
    }
    if (values.visa_expert_image_2 !== item.visa_expert_image_2) {
      formfield.append("visa_expert_image_2", values.visa_expert_image_2);
    }
    if (values.emigrant_expert_text_image !== item.emigrant_expert_text_image) {
      formfield.append(
        "emigrant_expert_text_image",
        values.emigrant_expert_text_image
      );
    }
    if (values.our_speciality_text_image !== item.our_speciality_text_image) {
      formfield.append(
        "our_speciality_text_image",
        values.our_speciality_text_image
      );
    }

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService_content/1/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(
          response.success,
          "Emigrant Service Content is successfuly updated..."
        );
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message, "Error");
      });
  };

  const submitEmigrantServiceForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await UpdateEmigrantServiceFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

  const updateGeneralSetting = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService_content/1/`
    );
    setItem(data && data);
    setVisaExpertImg1(data.visa_expert_image_1);
    setVisaExpertImg2(data.visa_expert_image_2);
    setEmigranExpertImg(data.emigrant_expert_text_image);
    setOurSpecialityImg(data.our_speciality_text_image);
    setContent(data.emigrant_expert_text);
    setContent1(data.our_speciality_text);
  };

  useEffect(() => {
    updateGeneralSetting();
  }, []);

  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                <h4 className="card-title flex-grow-1 fs-4">
                  <Link to="/">Dashboard</Link> | Emigrant Service Content
                </h4>
              </div>

              <div className="card-body">
                <Formik
                  enableReinitialize={true}
                  initialValues={updatedValues}
                  validationSchema={schema}
                  onSubmit={submitEmigrantServiceForm}
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
                              International Visa Experts Tilte
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                name="visa_expert_title"
                                id="visa_expert_title"
                                value={values.visa_expert_title}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.visa_expert_title &&
                                  !!errors.visa_expert_title
                                }
                                isValid={
                                  touched.visa_expert_title &&
                                  !errors.visa_expert_title
                                }
                                className="form-control mb-0"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.visa_expert_title}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <Form.Group className="form-outline imgDiv divv">
                            <Form.Label className="labelText">
                              International Visa Experts Image One
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="file"
                              name="visa_expert_image_1"
                              id="visa_expert_image_1"
                              onChange={(event) => {
                                setFieldValue(
                                  "visa_expert_image_1",
                                  event.currentTarget.files[0]
                                );
                                onVisaExpertImg1Change(event);
                              }}
                              isInvalid={
                                !!touched.visa_expert_image_1 &&
                                !!errors.visa_expert_image_1
                              }
                              isValid={
                                touched.visa_expert_image_1 &&
                                !errors.visa_expert_image_1
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.visa_expert_image_1}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {visaExpertImg1 && (
                            <div className="d-flex justify-content-start align-items-center mt-4">
                              <img
                                src={visaExpertImg1}
                                alt=""
                                style={{
                                  width: "180px",
                                  height: "140px",
                                  // border: "1px solid black",
                                  // borderRadius: "50%",
                                  // background: "green",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label className="labelText">
                              International Visa Experts Name One
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                name="visa_expert_name_1"
                                id="visa_expert_name_1"
                                value={values.visa_expert_name_1}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.visa_expert_name_1 &&
                                  !!errors.visa_expert_name_1
                                }
                                isValid={
                                  touched.visa_expert_name_1 &&
                                  !errors.visa_expert_name_1
                                }
                                className="form-control mb-0"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.visa_expert_name_1}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </div>

                        <div className="col-lg-6">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label className="labelText">
                              International Visa Experts Post One
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                name="visa_expert_post_1"
                                id="visa_expert_post_1"
                                value={values.visa_expert_post_1}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.visa_expert_post_1 &&
                                  !!errors.visa_expert_post_1
                                }
                                isValid={
                                  touched.visa_expert_post_1 &&
                                  !errors.visa_expert_post_1
                                }
                                className="form-control mb-0"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.visa_expert_post_1}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <Form.Group className="form-outline imgDiv divv">
                            <Form.Label className="labelText">
                              International Visa Experts Image Two
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="file"
                              name="visa_expert_image_2"
                              id="visa_expert_image_2"
                              onChange={(event) => {
                                setFieldValue(
                                  "visa_expert_image_2",
                                  event.currentTarget.files[0]
                                );
                                onVisaExpertImg2Change(event);
                              }}
                              isInvalid={
                                !!touched.visa_expert_image_2 &&
                                !!errors.visa_expert_image_2
                              }
                              isValid={
                                touched.visa_expert_image_2 &&
                                !errors.visa_expert_image_2
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.visa_expert_image_2}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {visaExpertImg2 && (
                            <div className="d-flex justify-content-start align-items-center mt-4">
                              <img
                                src={visaExpertImg2}
                                alt=""
                                style={{
                                  width: "180px",
                                  height: "140px",
                                  // border: "1px solid black",
                                  // borderRadius: "50%",
                                  // background: "green",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label className="labelText">
                              International Visa Experts Name Two
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                name="visa_expert_name_2"
                                id="visa_expert_name_2"
                                value={values.visa_expert_name_2}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.visa_expert_name_2 &&
                                  !!errors.visa_expert_name_2
                                }
                                isValid={
                                  touched.visa_expert_name_2 &&
                                  !errors.visa_expert_name_2
                                }
                                className="form-control mb-0"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.visa_expert_name_2}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </div>

                        <div className="col-lg-6">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label className="labelText">
                              International Visa Experts Post Two
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                name="visa_expert_post_2"
                                id="visa_expert_post_2"
                                value={values.visa_expert_post_2}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.visa_expert_post_2 &&
                                  !!errors.visa_expert_post_2
                                }
                                isValid={
                                  touched.visa_expert_post_2 &&
                                  !errors.visa_expert_post_2
                                }
                                className="form-control mb-0"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.visa_expert_post_2}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <Form.Group className="form-outline imgDiv divv">
                            <Form.Label className="labelText">
                              Emigrant Expert Image
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="file"
                              name="emigrant_expert_text_image"
                              id="emigrant_expert_text_image"
                              onChange={(event) => {
                                setFieldValue(
                                  "emigrant_expert_text_image",
                                  event.currentTarget.files[0]
                                );
                                onEmigrantExpertImgChange(event);
                              }}
                              isInvalid={
                                !!touched.emigrant_expert_text_image &&
                                !!errors.emigrant_expert_text_image
                              }
                              isValid={
                                touched.emigrant_expert_text_image &&
                                !errors.emigrant_expert_text_image
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.emigrant_expert_text_image}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {emigrantExpertImg && (
                            <div className="d-flex justify-content-start align-items-center mt-4">
                              <img
                                src={emigrantExpertImg}
                                alt=""
                                style={{
                                  width: "180px",
                                  height: "140px",
                                  // border: "1px solid black",
                                  // borderRadius: "50%",
                                  // background: "green",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label>
                              Emigrant Expert Text
                              <span className="text-danger"></span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <div style={{ width: "100%" }}>
                                <JoditEditor
                                  ref={editor}
                                  name="emigrant_expert_text"
                                  id="emigrant_expert_text"
                                  value={content}
                                  onChange={(newContent) =>
                                    setContent(newContent)
                                  }
                                />
                              </div>

                              <Form.Control.Feedback type="invalid">
                                {errors.emigrant_expert_text}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <Form.Group className="form-outline imgDiv divv">
                            <Form.Label className="labelText">
                              Our Speciality Image
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="file"
                              name="our_speciality_text_image"
                              id="our_speciality_text_image"
                              onChange={(event) => {
                                setFieldValue(
                                  "our_speciality_text_image",
                                  event.currentTarget.files[0]
                                );
                                onOurSpecialityImgChange(event);
                              }}
                              isInvalid={
                                !!touched.our_speciality_text_image &&
                                !!errors.our_speciality_text_image
                              }
                              isValid={
                                touched.our_speciality_text_image &&
                                !errors.our_speciality_text_image
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.our_speciality_text_image}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {ourspecialityImg && (
                            <div className="d-flex justify-content-start align-items-center mt-4">
                              <img
                                src={ourspecialityImg}
                                alt=""
                                style={{
                                  width: "180px",
                                  height: "140px",
                                  // border: "1px solid black",
                                  // borderRadius: "50%",
                                  // background: "green",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label>
                              Our Speciality Text
                              <span className="text-danger"></span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <div style={{ width: "100%" }}>
                                <JoditEditor
                                  ref={editor1}
                                  name="our_speciality_text"
                                  id="our_speciality_text"
                                  value={content1}
                                  onChange={(newContent1) =>
                                    setContent1(newContent1)
                                  }
                                />
                              </div>

                              <Form.Control.Feedback type="invalid">
                                {errors.our_speciality_text}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
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
  );
};

export default EmigrantDivisionContent;
