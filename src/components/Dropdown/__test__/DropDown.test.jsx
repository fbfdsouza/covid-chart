import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dropdown from "../Dropdown";

test("renders Dropdown a message", () => {
  render(<Dropdown />);
});
