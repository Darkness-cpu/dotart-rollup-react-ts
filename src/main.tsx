import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("Could not find a DOM element with ID 'root'.");
}
