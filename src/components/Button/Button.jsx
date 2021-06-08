import React from "react";
import PropTypes from "prop-types";
import "./style/Button.css";

const Button = ({ onClick, children, style, submit, disabled, className }) => {
  return (
    <button
      className={disabled ? `disabled ${className}` : `active className`}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: "",
  onClick: undefined,
  style: {},
  submit: undefined,
  disabled: undefined,
  className: "",
};

export default Button;
