import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dropdown from "../Dropdown";

const options = [{ label: "Brazil", value: "Brazil" }];

test("renders Dropdown a message", () => {
  render(<Dropdown options={options} onSelectedChange={() => null} selected='World' />);
});
