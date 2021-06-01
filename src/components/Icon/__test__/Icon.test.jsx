import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Icon from "../Icon";

test("renders Icon a message", () => {
  render(<Icon iconClassName="" />);
});
