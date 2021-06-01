import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved
import "./style/Input.css";

const Input = ({ onChange, type, style, value, placeholder, step, min }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      style={style}
      value={value}
      placeholder={placeholder}
      step={step}
      min={min}
    />
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  step: PropTypes.string,
  min: PropTypes.string,
};

Input.defaultProps = {
  onChange: undefined,
  style: {},
  value: undefined,
  placeholder: "",
  step: undefined,
  min: undefined,
};

export default Input;
