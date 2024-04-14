import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GigsContextProvider } from './context/GigsContext';
import { AuthContextProvider } from './context/AuthContext';
import { GroupedContextProvider } from './context/GroupedContext';
import { ApplicationsContextProvider } from './context/ApplicationsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GigsContextProvider>
        <ApplicationsContextProvider>
      <GroupedContextProvider>
        <App />
        </GroupedContextProvider>
        </ApplicationsContextProvider>
      </GigsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
