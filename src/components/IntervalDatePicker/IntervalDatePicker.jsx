import React, { memo } from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

const IntervalDatePicker = ({
  label,
  fromDate,
  toDate,
  fromDateHandler,
  toDateHandler,
}) => {
  const modifiers = { start: fromDate, end: toDate };

  return (
    <div className="InputFromTo">
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <label className="label" style={{ color: "#fff", fontSize: "18px" }}>
          {label}
        </label>
      </div>
      <DayPickerInput
        value={fromDate?.state?.month}
        placeholder="From"
        format="LL"
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          selectedDays: [fromDate, { fromDate, toDate }],
          disabledDays: { after: toDate },
          toMonth: toDate,
          modifiers,
          numberOfMonths: 2,
        }}
        onDayChange={fromDateHandler}
        inputProps={{
          readOnly: true,
          style: {
            width: "167px",
            padding: "10px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          },
        }}
      />{" "}
      —{" "}
      <span className="InputFromTo-to">
        <DayPickerInput
          value={toDate}
          placeholder="To"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [fromDate, { fromDate, toDate }],
            disabledDays: { before: fromDate },
            modifiers,
            month: fromDate,
            fromMonth: fromDate,
            numberOfMonths: 2,
          }}
          onDayChange={toDateHandler}
          inputProps={{
            readOnly: true,
            style: {
              width: "167px",
              padding: "10px 20px",
              margin: "8px 0",
              display: "inline-block",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            },
          }}
        />
      </span>
    </div>
  );
};

IntervalDatePicker.propTypes = {
  fromDateHandler: PropTypes.func.isRequired,
  toDateHandler: PropTypes.func.isRequired,
  label: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
};

IntervalDatePicker.defaultProps = {
  label: "",
  fromDate: undefined,
  toDate: undefined,
};

export default memo(IntervalDatePicker);
