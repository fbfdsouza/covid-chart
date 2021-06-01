import React from "react";
import PropTypes from "prop-types";
import "./style/RadioButton.css";

const RadioButton = ({ onChange, value, labelText, style, name }) => {
  return (
    <div style={style}>
      <input
        style={style.radioInside}
        type="radio"
        value={value}
        onChange={onChange}
        name={name}
        id={name}
      />
      <label htmlFor={value}>{labelText}</label>
    </div>
  );
};

RadioButton.propTypes = {
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  value: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

RadioButton.defaultProps = {
  onChange: undefined,
  style: {},
  value: "",
};

export default RadioButton;
