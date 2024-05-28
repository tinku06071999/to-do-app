import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import './header.css';

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    return (
        <div>
            <nav className='header bg-teal-600 text-white flex justify-between items-center p-4 shadow-lg'>
                <div className="logo text-2xl font-bold">
                    <NavLink to="/" className="text-white hover:text-gray-200">Todo App</NavLink>
                </div>
                <div className='flex items-center'>
                    {
                        token ? (
                            <div className='flex items-center'>
                                <p className='mr-4'>Welcome, <span className='text-yellow-200 capitalize'>{user.name}</span></p>
                                <button onClick={logout} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <ul className='flex space-x-4'>
                                <li>
                                    <NavLink to="/login" className="text-white hover:text-gray-200">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register" className="text-white hover:text-gray-200">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;
