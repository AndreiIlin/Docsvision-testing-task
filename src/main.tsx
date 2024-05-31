import { App } from '@/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_PATH}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
