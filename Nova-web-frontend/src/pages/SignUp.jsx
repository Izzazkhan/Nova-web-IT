import React, { useState } from "react";

import AxiosInstance from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { authTokenActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 'User'
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = AxiosInstance({
    "Content-Type": "application/json",
  });

  const onInputChangeHandle = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // if (name === "name") {
    //   errors.name = "";
    // }
    if (name === "email") {
      errors.email = "";
    }
    if (name === "password") {
      errors.password = "";
    }
    if (name === "confirmPassword") {
      errors.passwordConfirm = "";
    }
    // if (name === "role") {
    //   errors.role = "";
    // }
  };

  const onAuth = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      await axiosInstance
        .post("/auth/signUp", formData)
        .then((response) => {
          if (response.data.accessToken) {
            dispatch(authTokenActions.addToken(response.data.accessToken));
            navigate("/");
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
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+/;
    const errors = {};
    
    if (!data.password && !data.confirmPassword) {
      errors.password = "Password is required";
    } else {
      if (data.password.trim().length < 8) {
        errors.password = "Password is too short";
      }
      if (!passwordPattern.test(data.password)) {
        errors.password = "Password not contains number or uppercase";
      }
      if (data.password !== data.confirmPassword) {
        errors.password = "The passwords are not equal";
      }
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
      <form style={{padding: "16px", display: "flex", flexDirection:"column"}}>
        <div >
          <h1>Create your account!</h1>
        </div>
        <div>
          <div class="relative">
            <input type="name" name="name" class="mt-4 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Name"
            required
            onChange={onInputChangeHandle} />
          </div>
        </div>

        <div>
          <div class="relative">
            <input type="email" name="email" class="mt-4 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Email"
            required
            onChange={onInputChangeHandle} />
          </div>
          {errors.email && (
            <div >{errors.email}</div>
          )}
        </div>

        <div>
          <div class="relative">
            <input type="password" name="password" class="mt-4 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Password"
            onChange={onInputChangeHandle} />
          </div>
          {errors.password && (
            <div >{errors.password}</div>
          )}
        </div>
        <div>
          <div class="relative">
            <input type="password" name="confirmPassword" class="mt-4 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Confirm Password"
            onChange={onInputChangeHandle} />
          </div>
          {errors.password && (
            <div >{errors.password}</div>
          )}
        </div>

        <div>
          <div class="relative">
          <select name="role" onChange={onInputChangeHandle} class="mt-4 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          </div>
        </div>
        
        <div style={{padding: "16px"}}>
          <button
            title="Sign Up"
            onClick={onAuth}
            color="#faaf90"
          >Sign Up </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignUp;