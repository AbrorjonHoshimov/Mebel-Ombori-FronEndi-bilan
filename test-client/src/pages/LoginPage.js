import React, {useEffect, useState} from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../component/Constants";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const history = useNavigate()


    function login(event, values) {
        console.log(values)
        axios.post(API_PATH + 'auth/login', {
            username: values.username,
            password: values.password
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem(TOKEN_NAME, "Bearer " + res.data);
            history("/catalog")
        }).catch((error) => {
            console.log(error);
            toast.error("Xatolik!");
        })
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <AvForm onValidSubmit={login}>
                                    <AvField
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        required/>
                                    <AvField
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        required/>
                                    <button type='submit'
                                            className='btn btn-success btn-block'>
                                        Login
                                    </button>
                                </AvForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;