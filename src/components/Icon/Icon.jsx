import React from "react";
import PropTypes from "prop-types";

const Icon = ({ iconClassName, style }) => {
  return (
    <div style={style}>
      <i className={iconClassName} />
    </div>
  );
};

Icon.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Icon.defaultProps = {
  style: {},
};

export default Icon;
