import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "../Dropdown";

test("renders Button a message", () => {
  render(<Button />);
});
