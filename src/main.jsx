import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/authContext.jsx';
import './index.css'; // <-- CONNECTS ALL YOUR CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- CONNECTS THE ROUTER */}
      <AuthProvider> {/* <-- CONNECTS THE LOGIN STATE */}
        <App /> {/* <-- CONNECTS YOUR MAIN APP COMPONENT */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);