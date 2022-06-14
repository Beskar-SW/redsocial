import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import Settings from './Components/Settings';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route exact path="/settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
