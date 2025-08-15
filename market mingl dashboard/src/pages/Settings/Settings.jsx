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
  name: yup.string().required("Name is a required field!"),
  address: yup.string().required("Address is a required field!"),
  number: yup.string().required("Number is a required field!"),
  email: yup.string().required("Email is a required field!"),
  youtubeLink: yup.string().required("Youtube Link is a required field!"),
  whatsappLink: yup.string().required("WhatsApp Link is a required field!"),
  fbLink: yup.string().required("Facebook Link is a required field!"),
  instragramLink: yup.string().required("Instragram Link is a required field!"),
  logo: yup.mixed().required("Logo is a required field!"),
  mapurl: yup.string().required("Mapurl is a required field!"),
  footer_content: yup.string().required("Footer content is a required field!"),
  help_support: yup.string().required("Help support is a required field!"),
  terms_condition: yup
    .string()
    .required("Terms Condition is a required field!"),
  particular_duties: yup.string(),
  privacy_policy: yup.string().required("Privacy Policy is a required field!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.number) {
    errors.number = "Phone is required!";
  } else if (/^[0-9\b]+$/.test(values.number) === false) {
    errors.number = "Only number!";
  } else if (values.number.length !== 11) {
    errors.number = "Mobile Number contains 11 digit!";
  }

  return errors;
};

const Settings = () => {
  const [message, setMessage] = useState();
  const [item, setItem] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const editor1 = useRef(null);
  const [content1, setContent1] = useState("");

  const editor2 = useRef(null);
  const [content2, setContent2] = useState("");

  const editor3 = useRef(null);
  const [content3, setContent3] = useState("");

  const [showLogo, setShowLogo] = useState(null);

  const onLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowLogo(URL.createObjectURL(event.target.files[0]));
    }
  };

  // update
  const updatedValues = {
    name: item.name ? item.name : "",
    address: item.address ? item.address : "",
    number: item.number ? item.number : "",
    email: item.email ? item.email : "",
    youtubeLink: item.youtubeLink ? item.youtubeLink : "",
    whatsappLink: item.whatsappLink ? item.whatsappLink : "",
    fbLink: item.fbLink ? item.fbLink : "",
    instragramLink: item.instragramLink ? item.instragramLink : "",
    logo: item.logo ? item.logo : "",
    mapurl: item.mapurl ? item.mapurl : "",
    footer_content: item.footer_content ? item.footer_content : "",
    help_support: item.help_support ? item.help_support : "",
    terms_condition: item.terms_condition ? item.terms_condition : "",
    particular_duties: item.particular_duties ? item.particular_duties : "",
    privacy_policy: item.privacy_policy ? item.privacy_policy : "",
  };

  const UpdateGeneralSettingFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);
    formfield.append("address", values.address);
    formfield.append("number", values.number);
    formfield.append("email", values.email);
    formfield.append("youtubeLink", values.youtubeLink);
    formfield.append("whatsappLink", values.whatsappLink);
    formfield.append("fbLink", values.fbLink);
    formfield.append("instragramLink", values.instragramLink);
    formfield.append("mapurl", values.mapurl);
    formfield.append("footer_content", values.footer_content);
    formfield.append("help_support", content);
    formfield.append("terms_condition", content1);
    formfield.append("particular_duties", content2);
    formfield.append("privacy_policy", content3);

    if (values.logo !== item.logo) {
      formfield.append("logo", values.logo);
    }

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/setting_api/unpaginate_setting/1/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(
          response.success,
          "General setting is successfuly updated..."
        );
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message, "Error");
      });
  };

  const submitGeneralSettingForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await UpdateGeneralSettingFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

  const updateGeneralSetting = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/setting_api/unpaginate_setting/1/`
    );
    setItem(data && data);
    setShowLogo(data.logo);
    setContent(data.help_support);
    setContent1(data.terms_condition);
    setContent2(data.particular_duties);
    setContent3(data.privacy_policy);
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
                  <Link to="/">Dashboard</Link> | Settings
                </h4>
              </div>

              <div className="card-body">
                <Formik
                  enableReinitialize={true}
                  initialValues={updatedValues}
                  validationSchema={schema}
                  onSubmit={submitGeneralSettingForm}
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
                              Company<span className="text-danger">*</span>
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
                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Address<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  // as="textarea"
                                  name="address"
                                  id="address"
                                  value={values.address}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.address && !!errors.address
                                  }
                                  isValid={touched.address && !errors.address}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.address}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Number<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="number"
                                  id="number"
                                  value={values.number}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.number && !!errors.number
                                  }
                                  isValid={touched.number && !errors.number}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.number}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-0">
                              <Form.Label className="labelText">
                                Email<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  isInvalid={!!touched.email && !!errors.email}
                                  isValid={touched.email && !errors.email}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12 mb-3">
                            <Form.Group className="form-outline mb-3 imgDiv divv">
                              <Form.Label className="labelText">
                                Logo<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="logo"
                                id="logo"
                                onChange={(event) => {
                                  setFieldValue(
                                    "logo",
                                    event.currentTarget.files[0]
                                  );
                                  onLogoChange(event);
                                }}
                                isInvalid={!!touched.logo && !!errors.logo}
                                isValid={touched.logo && !errors.logo}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.logo}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {showLogo && (
                              <div className="d-flex justify-content-start align-items-center mt-4">
                                <img
                                  src={showLogo}
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
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Facebook Link
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="fbLink"
                                  id="fbLink"
                                  value={values.fbLink}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.fbLink && !!errors.fbLink
                                  }
                                  isValid={touched.fbLink && !errors.fbLink}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.fbLink}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Instagram Link
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="instragramLink"
                                  id="instragramLink"
                                  value={values.instragramLink}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.instragramLink &&
                                    !!errors.instragramLink
                                  }
                                  isValid={
                                    touched.instragramLink &&
                                    !errors.instragramLink
                                  }
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.instragramLink}
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
                                Twitter Link
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="youtubeLink"
                                  id="youtubeLink"
                                  value={values.youtubeLink}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.youtubeLink &&
                                    !!errors.youtubeLink
                                  }
                                  isValid={
                                    touched.youtubeLink && !errors.youtubeLink
                                  }
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.youtubeLink}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                LinkedIn Link
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="whatsappLink"
                                  id="whatsappLink"
                                  value={values.whatsappLink}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.whatsappLink &&
                                    !!errors.whatsappLink
                                  }
                                  isValid={
                                    touched.whatsappLink && !errors.whatsappLink
                                  }
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.whatsappLink}
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
                                Footer Content
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="footer_content"
                                  id="footer_content"
                                  value={values.footer_content}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.footer_content &&
                                    !!errors.footer_content
                                  }
                                  isValid={
                                    touched.footer_content &&
                                    !errors.footer_content
                                  }
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.footer_content}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label className="labelText">
                                Map url
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Control
                                  type="text"
                                  name="mapurl"
                                  id="mapurl"
                                  value={values.mapurl}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.mapurl && !!errors.mapurl
                                  }
                                  isValid={touched.mapurl && !errors.mapurl}
                                  className="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.mapurl}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label>
                                Help & Support
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <div style={{ width: "100%" }}>
                                  <JoditEditor
                                    ref={editor}
                                    name="help_support"
                                    id="help_support"
                                    value={content}
                                    onChange={(newContent) =>
                                      setContent(newContent)
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.help_support}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label>
                                Terms & Conditions
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <div style={{ width: "100%" }}>
                                  <JoditEditor
                                    ref={editor1}
                                    name="terms_condition"
                                    id="terms_condition"
                                    value={content1}
                                    onChange={(newContent1) =>
                                      setContent1(newContent1)
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.terms_condition}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 d-none">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label>
                                Particular Duties & Responsibilities
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <div
                                // style={{ width: "100%", height: "55vh" }}
                                >
                                  <JoditEditor
                                    ref={editor2}
                                    name="particular_duties"
                                    id="particular_duties"
                                    value={content2}
                                    onChange={(newContent2) =>
                                      setContent2(newContent2)
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.particular_duties}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-3">
                              <Form.Label>
                                Privacy Policy
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <div style={{ width: "100%" }}>
                                  <JoditEditor
                                    ref={editor3}
                                    name="privacy_policy"
                                    id="privacy_policy"
                                    value={content3}
                                    onChange={(newContent3) =>
                                      setContent3(newContent3)
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.privacy_policy}
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
  );
};

export default Settings;
