import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

} else {
    // Handle the case where the root element is not found
    console.error("Root element not found!");
}
