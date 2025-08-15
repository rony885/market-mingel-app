import React from "react";
import Form from "react-bootstrap/Form";

const Input = ({
  values,
  handleChange,
  touched,
  errors,
  label,
  variable,
  type,
  isTextarea,
  rows,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="name">
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <div className="input-single">
        <Form.Control
          type={!isTextarea ? type : undefined} // only set type for non-textareas
          as={isTextarea ? "textarea" : "input"}
          rows={isTextarea ? rows || 3 : undefined} // default rows for textarea
          name={variable}
          id={variable}
          value={values[variable]}
          onChange={handleChange}
          isInvalid={!!touched[variable] && !!errors[variable]}
          isValid={touched[variable] && !errors[variable]}
          required
        />
        <i className="fa-solid fa-user"></i>
      </div>
      <Form.Control.Feedback type="invalid">
        {errors[variable]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
