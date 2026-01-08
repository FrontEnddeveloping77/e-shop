// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext'; // To'g'ri import qiling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LanguageProvider> {/* <--- App aynan shu PROVIDER ichida bo'lishi shart! */}
            <App />
        </LanguageProvider>
    </React.StrictMode>
);