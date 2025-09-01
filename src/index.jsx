import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { App } from './App';
import { ToastContainer } from 'react-toastify';
render(<>
    <ToastContainer />
    <App />
</>, document.getElementById('root'));