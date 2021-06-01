import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Logo from "../Logo";

test("renders Logo a message", () => {
  render(<Logo path="" />);
});
