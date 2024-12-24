import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App.jsx"
import '../css/app.css';

const rootElement = document.getElementById('main');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
