import React from "react";
import ReactDOM from "react-dom/client";
import VitalsDisplay from './src/VitalsDisplay';
import App from "./app";
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
if (root) {
root.render(
<React.StrictMode>
  <App />
  <VitalsDisplay />
</React.StrictMode>
);

} else { console.error("Root element not found!"); }
