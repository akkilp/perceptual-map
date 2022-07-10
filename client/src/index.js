import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import MessageService from './components/MessageService';
import AuthenticationService from './components/AuthenticationService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthenticationService>
      <MessageService>
        <App />
      </MessageService>
    </AuthenticationService>

);

