import React, { useState } from 'react';
import AxiosInstance from "../axios/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const KYCForm = () => {
  const navigate = useNavigate();
  const axiosInstance = AxiosInstance({
    "Content-Type": "application/json",
  });
  const userId = useSelector((state) => state.authToken.userId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    
  };

  const postUserData = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('userId', userId);
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('document', file);

    console.log('form', JSON.stringify(form))

    await axiosInstance
      .post("/kyc/submit", form)
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
    });
  };

  return (
    <div className='mt-4'>
      <h1>KYC Submission</h1>
      <form onSubmit={postUserData}>

      <div class="w-full max-w-sm min-w-[200px] relative mt-4">
          <label class="block mb-2 text-sm text-slate-600">
            Name
          </label>
          <div class="relative">
            <input type="name" name="name" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required />
            </div>
        </div>

        <div class="w-full max-w-sm min-w-[200px] relative mt-4">
          <label class="block mb-2 text-sm text-slate-600">
            Email
          </label>
          <div class="relative">
            <input type="email" name="email" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required />
            </div>
        </div>

        <div class="w-full max-w-sm min-w-[200px] relative mt-4">
          <label class="block mb-2 text-sm text-slate-600">
            File Upload
          </label>
          <div class="relative">
            {/* <input type="file" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            placeholder="Upload File"
            onChange={handleChange}
            required /> */}
            <input type="file" onChange={handleFileChange} required />
            </div>
        </div>

        <button
          onClick={postUserData}
          type="submit"
          data-ripple-light="true"
          class="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default KYCForm;
