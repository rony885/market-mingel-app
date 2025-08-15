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
  about_us_text1: yup.string().required("About us text1 is a required field!"),
  about_us_text2: yup.string().required("About us text2 is a required field!"),
  about_us_text3: yup.string().required("About us text3 is a required field!"),
  about_us_text4: yup.string().required("About us text4 is a required field!"),
  chairman_message_text1: yup
    .string()
    .required("Chairman message text1 is a required field!"),
  chairman_message_text2: yup
    .string()
    .required("Chairman message text2 is a required field!"),
  chairman_message_text3: yup
    .string()
    .required("Chairman message text3 is a required field!"),
  chairman_message_text4: yup
    .string()
    .required("Chairman message text4 is a required field!"),
  vission: yup.string().required("Vission is a required field!"),
  mission: yup.string().required("Mission is a required field!"),
  manpower_text1: yup.string().required("Manpower text1 is a required field!"),
  manpower_text2: yup.string().required("Manpower text2 is a required field!"),
  manpower_text3: yup.string().required("Manpower text3 is a required field!"),
  manpower_text4: yup.string().required("Manpower text4 is a required field!"),
  manpower_text5: yup.string().required("Manpower text5 is a required field!"),
  manpower_text6: yup.string().required("Manpower text6 is a required field!"),
  about_us_image: yup.mixed().required("About us image is a required field!"),
  chairman_message_image: yup
    .mixed()
    .required("Chairman message image is a required field!"),
  vission_mission_image: yup
    .mixed()
    .required("Vission mission image is a required field!"),
  manpower_image: yup.mixed().required("Manpower image is a required field!"),
});

const validate = (values) => {
  let errors = {};

  return errors;
};

const AboutUs = () => {
  const [message, setMessage] = useState();
  const [item, setItem] = useState({});
  const [aboutUsImg, setAboutUsImg] = useState(null);
  const [chairmanMgsImg, setChairmanMgsImg] = useState(null);
  const [vissionMissImg, setVissionMissImg] = useState(null);
  const [manPowerImg, setmanPowerImg] = useState(null);

  const onAboutUsImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAboutUsImg(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onChairmanMgsImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setChairmanMgsImg(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onVissionMissImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setVissionMissImg(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onManPowerImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setmanPowerImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // update
  const updatedValues = {
    about_us_text1: item.about_us_text1 ? item.about_us_text1 : "",
    about_us_text2: item.about_us_text2 ? item.about_us_text2 : "",
    about_us_text3: item.about_us_text3 ? item.about_us_text3 : "",
    about_us_text4: item.about_us_text4 ? item.about_us_text4 : "",
    chairman_message_text1: item.chairman_message_text1
      ? item.chairman_message_text1
      : "",
    chairman_message_text2: item.chairman_message_text2
      ? item.chairman_message_text2
      : "",
    chairman_message_text3: item.chairman_message_text3
      ? item.chairman_message_text3
      : "",
    chairman_message_text4: item.chairman_message_text4
      ? item.chairman_message_text4
      : "",
    vission: item.vission ? item.vission : "",
    mission: item.mission ? item.mission : "",
    manpower_text1: item.manpower_text1 ? item.manpower_text1 : "",
    manpower_text2: item.manpower_text2 ? item.manpower_text2 : "",
    manpower_text3: item.manpower_text3 ? item.manpower_text3 : "",
    manpower_text4: item.manpower_text4 ? item.manpower_text4 : "",
    manpower_text5: item.manpower_text5 ? item.manpower_text5 : "",
    manpower_text6: item.manpower_text6 ? item.manpower_text6 : "",
    about_us_image: item.about_us_image ? item.about_us_image : "",
    chairman_message_image: item.chairman_message_image
      ? item.chairman_message_image
      : "",
    vission_mission_image: item.vission_mission_image
      ? item.vission_mission_image
      : "",
    manpower_image: item.manpower_image ? item.manpower_image : "",
  };

  const UpdateAboutUsFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("about_us_text1", values.about_us_text1);
    formfield.append("about_us_text2", values.about_us_text2);
    formfield.append("about_us_text3", values.about_us_text3);
    formfield.append("about_us_text4", values.about_us_text4);
    formfield.append("chairman_message_text1", values.chairman_message_text1);
    formfield.append("chairman_message_text2", values.chairman_message_text2);
    formfield.append("chairman_message_text3", values.chairman_message_text3);
    formfield.append("chairman_message_text4", values.chairman_message_text4);
    formfield.append("vission", values.vission);
    formfield.append("mission", values.mission);
    formfield.append("manpower_text1", values.manpower_text1);
    formfield.append("manpower_text2", values.manpower_text2);
    formfield.append("manpower_text3", values.manpower_text3);
    formfield.append("manpower_text4", values.manpower_text4);
    formfield.append("manpower_text5", values.manpower_text5);
    formfield.append("manpower_text6", values.manpower_text6);

    if (values.about_us_image !== item.about_us_image) {
      formfield.append("about_us_image", values.about_us_image);
    }
    if (values.chairman_message_image !== item.chairman_message_image) {
      formfield.append("chairman_message_image", values.chairman_message_image);
    }
    if (values.vission_mission_image !== item.vission_mission_image) {
      formfield.append("vission_mission_image", values.vission_mission_image);
    }
    if (values.manpower_image !== item.manpower_image) {
      formfield.append("manpower_image", values.manpower_image);
    }

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/about_api/unpaginate_about_us/1/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(
          response.success,
          "About Us setting is successfuly updated..."
        );
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message, "Error");
      });
  };

  const submitAboutUsForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await UpdateAboutUsFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

  const updateAboutUs = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/about_api/unpaginate_about_us/1/`
    );
    setItem(data && data);
    setAboutUsImg(data.about_us_image);
    setChairmanMgsImg(data.chairman_message_image);
    setVissionMissImg(data.vission_mission_image);
    setmanPowerImg(data.manpower_image);
  };

  useEffect(() => {
    updateAboutUs();
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
                    <Link to="/">Dashboard</Link> | About Us
                  </h4>
                </div>

                <div className="card-body">
                  <Formik
                    enableReinitialize={true}
                    initialValues={updatedValues}
                    validationSchema={schema}
                    onSubmit={submitAboutUsForm}
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
                              <Form.Group className="form-outline mb-3 imgDiv divv">
                                <Form.Label>
                                  About Us Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="about_us_image"
                                  id="about_us_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "about_us_image",
                                      event.currentTarget.files[0]
                                    );
                                    onAboutUsImgChange(event);
                                  }}
                                  isInvalid={
                                    !!touched.about_us_image &&
                                    !!errors.about_us_image
                                  }
                                  isValid={
                                    touched.about_us_image &&
                                    !errors.about_us_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.about_us_image}
                                </Form.Control.Feedback>

                                {aboutUsImg && (
                                  <div>
                                    <img
                                      alt="product preview img"
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        marginTop: "20px",
                                        borderRadius: "50%",
                                      }}
                                      src={aboutUsImg}
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
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  About Us One
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="about_us_text1"
                                    id="about_us_text1"
                                    value={values.about_us_text1}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.about_us_text1 &&
                                      !!errors.about_us_text1
                                    }
                                    isValid={
                                      touched.about_us_text1 &&
                                      !errors.about_us_text1
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.about_us_text1}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  About Us Two
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="about_us_text2"
                                    id="about_us_text2"
                                    value={values.about_us_text2}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.about_us_text2 &&
                                      !!errors.about_us_text2
                                    }
                                    isValid={
                                      touched.about_us_text2 &&
                                      !errors.about_us_text2
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.about_us_text2}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  About Us Three
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="about_us_text3"
                                    id="about_us_text3"
                                    value={values.about_us_text3}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.about_us_text3 &&
                                      !!errors.about_us_text3
                                    }
                                    isValid={
                                      touched.about_us_text3 &&
                                      !errors.about_us_text3
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.about_us_text3}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  About Us Four
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="about_us_text4"
                                    id="about_us_text4"
                                    value={values.about_us_text4}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.about_us_text4 &&
                                      !!errors.about_us_text4
                                    }
                                    isValid={
                                      touched.about_us_text4 &&
                                      !errors.about_us_text4
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.about_us_text4}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3 imgDiv divv">
                                <Form.Label>
                                  Chairman Message Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="chairman_message_image"
                                  id="chairman_message_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "chairman_message_image",
                                      event.currentTarget.files[0]
                                    );
                                    onChairmanMgsImgChange(event);
                                  }}
                                  isInvalid={
                                    !!touched.chairman_message_image &&
                                    !!errors.chairman_message_image
                                  }
                                  isValid={
                                    touched.chairman_message_image &&
                                    !errors.chairman_message_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.chairman_message_image}
                                </Form.Control.Feedback>

                                {chairmanMgsImg && (
                                  <div>
                                    <img
                                      alt="product preview img"
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        marginTop: "20px",
                                        borderRadius: "50%",
                                      }}
                                      src={chairmanMgsImg}
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
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Chairman Message Text One
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="chairman_message_text1"
                                    id="chairman_message_text1"
                                    value={values.chairman_message_text1}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.chairman_message_text1 &&
                                      !!errors.chairman_message_text1
                                    }
                                    isValid={
                                      touched.chairman_message_text1 &&
                                      !errors.chairman_message_text1
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.chairman_message_text1}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Chairman Message Text Two
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="chairman_message_text2"
                                    id="chairman_message_text2"
                                    value={values.chairman_message_text2}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.chairman_message_text2 &&
                                      !!errors.chairman_message_text2
                                    }
                                    isValid={
                                      touched.chairman_message_text2 &&
                                      !errors.chairman_message_text2
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.chairman_message_text2}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Chairman Message Text Three
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="chairman_message_text3"
                                    id="chairman_message_text3"
                                    value={values.chairman_message_text3}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.chairman_message_text3 &&
                                      !!errors.chairman_message_text3
                                    }
                                    isValid={
                                      touched.chairman_message_text3 &&
                                      !errors.chairman_message_text3
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.chairman_message_text3}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Chairman Message Text Four
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="chairman_message_text4"
                                    id="chairman_message_text4"
                                    value={values.chairman_message_text4}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.chairman_message_text4 &&
                                      !!errors.chairman_message_text4
                                    }
                                    isValid={
                                      touched.chairman_message_text4 &&
                                      !errors.chairman_message_text4
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.chairman_message_text4}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3 imgDiv divv">
                                <Form.Label>
                                  Vision & Mission Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="vission_mission_image"
                                  id="vission_mission_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "vission_mission_image",
                                      event.currentTarget.files[0]
                                    );
                                    onVissionMissImgChange(event);
                                  }}
                                  isInvalid={
                                    !!touched.vission_mission_image &&
                                    !!errors.vission_mission_image
                                  }
                                  isValid={
                                    touched.vission_mission_image &&
                                    !errors.vission_mission_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.vission_mission_image}
                                </Form.Control.Feedback>

                                {vissionMissImg && (
                                  <div>
                                    <img
                                      alt="product preview img"
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        marginTop: "20px",
                                        borderRadius: "50%",
                                      }}
                                      src={vissionMissImg}
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
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Our Vision:
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="vission"
                                    id="vission"
                                    value={values.vission}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.vission && !!errors.vission
                                    }
                                    isValid={touched.vission && !errors.vission}
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.vission}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Our Mission:
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="mission"
                                    id="mission"
                                    value={values.mission}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.mission && !!errors.mission
                                    }
                                    isValid={touched.mission && !errors.mission}
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.mission}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3 imgDiv divv">
                                <Form.Label>
                                  Manpower Image
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="manpower_image"
                                  id="manpower_image"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "manpower_image",
                                      event.currentTarget.files[0]
                                    );
                                    onManPowerImgChange(event);
                                  }}
                                  isInvalid={
                                    !!touched.manpower_image &&
                                    !!errors.manpower_image
                                  }
                                  isValid={
                                    touched.manpower_image &&
                                    !errors.manpower_image
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.manpower_image}
                                </Form.Control.Feedback>

                                {manPowerImg && (
                                  <div>
                                    <img
                                      alt="product preview img"
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        marginTop: "20px",
                                        borderRadius: "50%",
                                      }}
                                      src={manPowerImg}
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
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Manpower Text One
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="manpower_text1"
                                    id="manpower_text1"
                                    value={values.manpower_text1}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.manpower_text1 &&
                                      !!errors.manpower_text1
                                    }
                                    isValid={
                                      touched.manpower_text1 &&
                                      !errors.manpower_text1
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.manpower_text1}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Manpower Text Two
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="manpower_text2"
                                    id="manpower_text2"
                                    value={values.manpower_text2}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.manpower_text2 &&
                                      !!errors.manpower_text2
                                    }
                                    isValid={
                                      touched.manpower_text2 &&
                                      !errors.manpower_text2
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.manpower_text2}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Manpower Text Three
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="manpower_text3"
                                    id="manpower_text3"
                                    value={values.manpower_text3}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.manpower_text3 &&
                                      !!errors.manpower_text3
                                    }
                                    isValid={
                                      touched.manpower_text3 &&
                                      !errors.manpower_text3
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.manpower_text3}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Manpower Text Four
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="manpower_text4"
                                    id="manpower_text4"
                                    value={values.manpower_text4}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.manpower_text4 &&
                                      !!errors.manpower_text4
                                    }
                                    isValid={
                                      touched.manpower_text4 &&
                                      !errors.manpower_text4
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.manpower_text4}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Manpower Text Five
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="manpower_text5"
                                    id="manpower_text5"
                                    value={values.manpower_text5}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.manpower_text5 &&
                                      !!errors.manpower_text5
                                    }
                                    isValid={
                                      touched.manpower_text5 &&
                                      !errors.manpower_text5
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.manpower_text5}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="col-lg-12">
                              <Form.Group className="form-outline mb-3">
                                <Form.Label className="labelText">
                                  Manpower Text Six
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    name="manpower_text6"
                                    id="manpower_text6"
                                    value={values.manpower_text6}
                                    onChange={handleChange}
                                    isInvalid={
                                      !!touched.manpower_text6 &&
                                      !!errors.manpower_text6
                                    }
                                    isValid={
                                      touched.manpower_text6 &&
                                      !errors.manpower_text6
                                    }
                                    className="form-control mb-0"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.manpower_text6}
                                  </Form.Control.Feedback>
                                </InputGroup>
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

export default AboutUs;
