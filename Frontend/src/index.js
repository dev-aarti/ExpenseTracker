import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(
   document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// ReactDOM.render(
//   <h1>Hello, World!</h1>,
//   document.getElementById('root')
// )