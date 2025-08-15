import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";

import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Category name is a required field!"),
});

const validate = (values) => {
  let errors = {};
  return errors;
};

const ServiceCategoryAdd = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  // add
  const AddCategoryFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/service_api/unpaginate_service_category/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "Category is successfuly created...");
        navigate("/service-category");
        window.location.reload(false);
      })
      .catch((error) => {
        setMessage(error.message, "Error");
      });
  };

  const submitAddCategoryForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await AddCategoryFunc(values);
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
                    <Link to="/">Dashboard</Link> | Add Service Category
                  </h4>

                  <Link
                    to="/service-category"
                    className="btn btn-sm btn-primary fs-4"
                  >
                    Service Category List
                  </Link>
                </div>

                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={submitAddCategoryForm}
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
                                Category Name
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
                                  classname="form-control mb-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.name}
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
                                  : "Add Service Category"}
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

export default ServiceCategoryAdd;
