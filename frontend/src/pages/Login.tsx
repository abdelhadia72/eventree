import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';

function Login() {
    const [email, setEmail] = useState('nxorgamaffnt@google.com');
    const [password, setPassword] = useState('Hello(())123');
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/login',
            data: {
                email,
                password
            }
        }).then(res => {
            // console.log("Data is ", res.data)
            console.log('user')
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({ type: 'LOGIN', payload: res.data });
            navigate('/');


        })
        console.log({ email, password });
    };

    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <h1 className="text-4xl font-bold mb-10 flex justify-center items-center gap-2">
                Login
                </h1>
            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        placeholder="name@organization.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="text-500  mb-4">
                    <Link to="/Login">Forget password?</Link>
                </div>

                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Remember me
                    </label>
                </div>
                <button
                    type="submit"
                    className="text-white bg-red-500 font-bold w-[100%] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Login
                </button>
                <div className="mt-4 text-gray-800 flex items-center gap-2">
                    <p>I don't have an account</p>
                    <Link to="/signup" className="font-bold text-sm underline text-red-400">SIGNUP</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;