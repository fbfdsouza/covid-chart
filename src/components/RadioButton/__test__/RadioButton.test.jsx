import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RadioButton from "../RadioButton";

test("renders RadioButton a message", () => {
  render(<RadioButton labelText="" name="" />);
});
