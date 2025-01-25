import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file
import { useDispatch, useSelector } from "react-redux";
import { authTokenActions } from "../store/authSlice";
import AxiosInstance from "../axios/axiosInstance";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.authToken.userId);
    const userRole = useSelector((state) => state.authToken.role)

    const axiosInstance = AxiosInstance({
        "Content-Type": "application/json",
    });

    const onLogout = async () => {
    await axiosInstance
        .get("/auth/logout")
        .then((response) => {
        dispatch(authTokenActions.deleteToken());
        navigate("/login");
        })
        .catch((error) => {
        console.log(error);
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MyApp
                </Link>
                <ul className="navbar-links">
                    {userId ? (
                        <>
                        {userRole === 'Admin' ?
                         <li>
                            <Link to="/admin">Admin</Link>
                        </li> :
                        <li>
                            <Link to="/kyc">KYC</Link>
                        </li>
                        }
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={onLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                            <Link to="/signUp">Sign Up</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
