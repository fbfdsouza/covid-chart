import React from "react";
import PropTypes from "prop-types";

const Logo = ({ path }) => {
  return (
    <div>
      <img src={path} alt="" />
    </div>
  );
};

Logo.propTypes = {
  path: PropTypes.string.isRequired,
};

Logo.defaultProps = {};

export default Logo;
