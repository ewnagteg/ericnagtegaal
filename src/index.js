import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/Auth0Provider";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
