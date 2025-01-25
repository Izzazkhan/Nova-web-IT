import React, { useState } from "react";
import AxiosInstance from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { authTokenActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = AxiosInstance({
    "Content-Type": "application/json",
  });

  const onInputChangeHandle = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
    if (name === "email") {
      errors.email = "";
    }
    if (name === "password") {
      errors.password = "";
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(loginData);
    if (Object.keys(validationErrors).length === 0) {
      // console.log(loginData);
      await axiosInstance
        .post("/auth/signIn", loginData)
        .then((response) => {
          if (response.data.accessToken) {
            dispatch(authTokenActions.addToken(response.data.accessToken));
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Test the email against the pattern
    return emailPattern.test(email);
  };

  return (
    <React.Fragment>
      <form style={{padding:"16px", display:"flex", flexDirection: "column"}}>
        <div>
            <h1>Welcome!</h1>
        </div>

        <div class="w-full max-w-sm min-w-[200px] relative mt-4">
          <label class="block mb-2 text-sm text-slate-600">
            Email
          </label>
          <div class="relative">
            <input type="email" name="email" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Email"
            onChange={onInputChangeHandle} />
          </div>
        </div>

        <div class="w-full max-w-sm min-w-[200px] relative mt-4">
          <label class="block mb-2 text-sm text-slate-600">
            Password
          </label>
          <div class="relative">
            <input type="password" name="password" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Password"
            onChange={onInputChangeHandle} />
          </div>
        </div>
        
        <button
          onClick={onLogin}
          type="button"
          data-ripple-light="true"
          class="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Sign In
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;