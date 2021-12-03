import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


