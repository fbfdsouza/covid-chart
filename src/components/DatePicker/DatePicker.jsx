import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./style/DatePicker.css";

// eslint-disable-next-line react/prop-types
export default function ReactDayPicker({ dayPickerProps: { onChange } }) {
  return (
    <DayPickerInput
      onDayChange={onChange}
      inputProps={{
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
  );
}
