import React from 'react';
import ReactDOM from 'react-dom/client';
import rollbar from "./config/rollbar";
import App from './App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

window.addEventListener('error', (event) => {
    rollbar.error(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    rollbar.error(event.reason);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
