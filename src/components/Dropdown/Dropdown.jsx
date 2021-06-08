import React, { useState, useEffect, useRef, memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const DropDownWrapper = styled.div`
  text-align: center;

  #dropdownLabel {
    color: #fff;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <DropDownWrapper className="field">
        <label id="dropdownLabel">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon" />
          <div className="text">{selected}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </DropDownWrapper>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.string.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  label: "",
};

export default memo(Dropdown);
