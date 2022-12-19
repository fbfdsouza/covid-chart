import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppContainer from "./containers/AppContainer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContainer />
  </StrictMode>
);