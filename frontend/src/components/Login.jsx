import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            {userToken && <Navigate to="/" />}
            <section className="login-container">
                <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg shadow-xl">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                    </div>
                    <form method='post' onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-center border-2 border-red-600 p-2 mb-4 rounded-md bg-red-200 shadow-lg">
                                {error.message}
                            </div>
                        )}
                        <div className="mb-4">
                            <input
                                type="email"
                                name='email'
                                onChange={handleChange}
                                className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                className="form-control block w-full px-4 py-3 text-lg font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password"
                            />
                        </div>
                        <div className="text-center lg:text-left">
                            <button
                                type="submit"
                                className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                Login
                            </button>
                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                Don't have an account? 
                                <Link
                                    to={"/register"}
                                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
