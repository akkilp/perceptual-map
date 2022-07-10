import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import MessageService from './components/MessageService';
import AuthenticationService from './components/AuthenticationService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationService>
      <MessageService>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MessageService>
    </AuthenticationService>
  </React.StrictMode>
);

