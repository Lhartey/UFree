import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GigsContextProvider } from './context/GigsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GigsContextProvider>
        <App />
      </GigsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
