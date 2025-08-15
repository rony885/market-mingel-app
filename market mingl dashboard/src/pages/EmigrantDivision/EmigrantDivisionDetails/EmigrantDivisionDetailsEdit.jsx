import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

import JoditEditor from "jodit-react";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

import { useApiContext } from "../../../context/ApiContext";

const schema = yup.object().shape({
  name: yup.string().required("Service name is a required field!"),
  category: yup.string().required("Category name is a required field!"),
  decsription: yup.string(),
  image: yup.mixed().required("Image is a required field!"),
});

const validate = (values) => {
  let errors = {};
  return errors;
};

const EmigrantDivisionDetailsEdit = () => {
  // data fetching
  const {
    unpaginate_emigrantService_category,
    fetchUnpaginateEmigrantSerCategory,
  } = useApiContext();

  useEffect(() => {
    fetchUnpaginateEmigrantSerCategory();
  }, [fetchUnpaginateEmigrantSerCategory]);

  const [message, setMessage] = useState();
  const [item, setItem] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [showImage, setShowImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // update
  const updatedValues = {
    name: item.name ? item.name : "",
    category: item.category ? item.category : "",
    decsription: item.decsription ? item.decsription : "",
    image: item.image ? item.image : "",
  };

  const UpdateEmigrantServiceFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);
    formfield.append("category", values.category);
    formfield.append("decsription", content);

    if (values.image !== item.image) {
      formfield.append("image", values.image);
    }

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService/${item.id}/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(
          response.success,
          "Emigrant Service is successfully updated..."
        );
        navigate("/emigrant-service");
        window.location.reload(false);
      })
      .catch((error) => {
        setMessage(error.message, "Error");
      });
  };

  const submitUpdateEmigrantServiceForm = async (
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

  useEffect(() => {
    const updateEmigrantService = async (id) => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService/${id}/`
      );
      setItem(data);
      setShowImage(data.image);
      setContent(data.decsription);
    };
    updateEmigrantService(id);
  }, [id]);

  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                <h4 className="card-title flex-grow-1 fs-4">
                  <Link to="/">Dashboard</Link> | Edit Emigrant Division
                </h4>

                <Link
                  to="/emigrant-service"
                  className="btn btn-sm btn-primary fs-4"
                >
                  Emigrant Division List
                </Link>
              </div>

              <div className="card-body">
                <Formik
                  enableReinitialize={true}
                  initialValues={updatedValues}
                  validationSchema={schema}
                  onSubmit={submitUpdateEmigrantServiceForm}
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
                            <Form.Label>
                              Name
                              <span className="text-danger">*</span>
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
                            <Form.Label>
                              Category
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup hasValidation>
                              <Form.Select
                                name="category"
                                id="category"
                                value={values.category}
                                onChange={handleChange}
                                isInvalid={
                                  !!touched.category && !!errors.category
                                }
                                isValid={touched.category && !errors.category}
                                className="form-control"
                              >
                                <option value="">Select</option>
                                {unpaginate_emigrantService_category &&
                                  unpaginate_emigrantService_category.map(
                                    (category, index) => {
                                      return (
                                        <option key={index} value={category.id}>
                                          {category.name}
                                        </option>
                                      );
                                    }
                                  )}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.category}
                              </Form.Control.Feedback>
                            </InputGroup>
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
                                  alt="img"
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

                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Group className="form-outline mb-3">
                            <Form.Label>
                              Description
                              <span className="text-danger"></span>
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

                      <div className="p-3  my-3 rounded">
                        <div className="row justify-content-end g-2">
                          <div className="col-lg-2">
                            <button
                              className="btn btn-outline-secondary w-100"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? "Submitting..."
                                : "Edit Emigrant Division"}
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
  );
};

export default EmigrantDivisionDetailsEdit;
