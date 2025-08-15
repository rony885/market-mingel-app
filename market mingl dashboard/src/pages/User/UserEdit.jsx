import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

const schema = yup.object().shape({
  email: yup.string().required("Username is a required field!"),
  f_name: yup.string().required("First name is a required field!"),
  l_name: yup.string(),
  role: yup.string().required("Role is a required field!"),
  phone: yup.string().required("Phone is a required field!"),
  eemmaaiill: yup.string().required("Email is a required field!"),
  image: yup.mixed(),
  //   password: yup.string().required("Password is a required field!"),
  //   confirm_password: yup
  //     .string()
  //     .required("Confirm Password is a required field!"),
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

  if (!values.eemmaaiill) {
    errors.eemmaaiill = "Email is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
    errors.eemmaaiill = "Invalid Email!";
  }

  //   if (!values.password) {
  //     errors.password = "Password is required!";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password is too short!";
  //   }

  //   if (!values.confirm_password) {
  //     errors.confirm_password = "Confirm password is required!";
  //   } else if (values.confirm_password.length < 4) {
  //     errors.confirm_password = "Confirm password is too short!";
  //   }

  return errors;
};

const UserEdit = () => {
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  // for image
  const [showImage, setShowImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // update
  const updatedValues = {
    email: item.email ? item.email : "",
    f_name: item.f_name ? item.f_name : "",
    l_name: item.l_name ? item.l_name : "",
    role: item.role ? item.role : "",
    phone: item.phone ? item.phone : "",
    eemmaaiill: item.eemmaaiill ? item.eemmaaiill : "",
    image: item.image ? item.image : "",
  };

  const UpdateUserFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("email", values.email);
    formfield.append("f_name", values.f_name);
    formfield.append("l_name", values.l_name);
    formfield.append("role", values.role);
    formfield.append("phone", values.phone);
    formfield.append("eemmaaiill", values.eemmaaiill);

    if (values.image !== item.image) {
      formfield.append("image", values.image);
    }

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/all_users/${item.id}/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "User is successfully updated...");
        navigate("/user");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(
          error.response.data.email ||
            error.response.data.phone ||
            error.response.data.eemmaaiill ||
            error.message,
          "Error"
        );
      });
  };

  const submitUpdateUserForm = async (
    values,
    { setErrors, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true); // Disable button during submission
      await UpdateUserFunc(values); // Ensure this function returns a promise
      setSubmitting(false); // Re-enable button if necessary after submission
      // resetForm(); // Uncomment if you want to reset the form after submission
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false); // Re-enable button in case of an error
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/custom_user/all_users/${id}/`
      );
      setItem(data);
      setShowImage(data.image);
    };

    updateUser();
  }, [id]);

  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                <h4 className="card-title flex-grow-1 fs-4">
                  <Link to="/">Dashboard</Link> | Edit User
                </h4>

                <Link to="/user" className="btn btn-sm btn-primary fs-4">
                  User List
                </Link>
              </div>

              <div className="card-body">
                <Formik
                  enableReinitialize={true}
                  initialValues={updatedValues}
                  validationSchema={schema}
                  onSubmit={submitUpdateUserForm}
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
                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-2">
                              <Form.Label>
                                First Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="f_name"
                                  id="f_name"
                                  value={values.f_name}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.f_name && !!errors.f_name
                                  }
                                  isValid={touched.f_name && !errors.f_name}
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.f_name}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-2">
                              <Form.Label>
                                Last Name<span></span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="l_name"
                                  id="l_name"
                                  value={values.l_name}
                                  onChange={handleChange}
                                  isInvalid={
                                    !!touched.l_name && !!errors.l_name
                                  }
                                  isValid={touched.l_name && !errors.l_name}
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.l_name}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-2">
                              <Form.Label>
                                User Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  isInvalid={!!touched.email && !!errors.email}
                                  isValid={touched.email && !errors.email}
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-2">
                              <Form.Label>
                                Role
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Select
                                  name="role"
                                  id="role"
                                  value={values.role}
                                  onChange={handleChange}
                                  isInvalid={!!touched.role && !!errors.role}
                                  isValid={touched.role && !errors.role}
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="super admin">
                                    Super Admin
                                  </option>
                                  <option value="admin">Admin</option>
                                  <option value="manager">Manager</option>
                                  <option value="staff">Staff</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {errors.role}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-2">
                              <Form.Label>
                                Phone
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                {/* <InputGroup.Text>@</InputGroup.Text> */}
                                <Form.Control
                                  type="text"
                                  name="phone"
                                  id="phone"
                                  value={values.phone}
                                  onChange={handleChange}
                                  isInvalid={!!touched.phone && !!errors.phone}
                                  isValid={touched.phone && !errors.phone}
                                  className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.phone}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="col-lg-12">
                            <Form.Group className="form-outline mb-2">
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
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Group className="form-outline mb-2 imgDiv divv">
                            <Form.Label>
                              Input Image<span className="text-danger">*</span>
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
                                  alt="user img"
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

                      {/* message  */}
                      {message && (
                        <h6 className="text-center m-2 text-capitalize">
                          {message}
                        </h6>
                      )}

                      <div className="p-3  my-3 rounded">
                        <div className="row justify-content-end g-2">
                          <div className="col-lg-2">
                            <button
                              className="btn btn-outline-secondary w-100"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Editing..." : "Edit User"}
                            </button>
                          </div>

                          <div className="col-lg-2">
                            <button
                              className="btn btn-primary w-100"
                              type="reset"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
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

export default UserEdit;
