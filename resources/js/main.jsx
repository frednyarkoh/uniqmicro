import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import App from './App.jsx';

const rootElement = document.getElementById('main');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
