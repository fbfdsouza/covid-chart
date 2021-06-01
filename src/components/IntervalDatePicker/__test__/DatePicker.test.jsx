import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DatePicker from "../DatePicker";

test("renders DatePicker a message", () => {
  render(<DatePicker />);
});
