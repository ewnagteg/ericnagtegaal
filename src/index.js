import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/auth/Auth0Provider";
import { MessageProvider } from './components/MessageProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <MessageProvider>
                    <App />
                </MessageProvider>
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>
);
