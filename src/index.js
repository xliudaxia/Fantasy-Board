import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';
import DrawArea from './DrawArea'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DrawArea />
  </React.StrictMode>
);
