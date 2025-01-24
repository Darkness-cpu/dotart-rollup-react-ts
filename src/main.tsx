import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div>
      <App size={150} />
      <App size={300} /> {/* Different size */}
    </div>
  </React.StrictMode>
);
