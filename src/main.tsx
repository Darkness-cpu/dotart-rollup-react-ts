import React from "react";
import { createRoot } from "react-dom/client";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <div>
        <h2>Hello World</h2>
      </div>
    </React.StrictMode>
  );
} else {
  console.log("Could not find a DOM element with ID 'root'.");
}
