import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios/axiosInstance";
import { useSelector } from "react-redux";

const AdminPanel = () => {
    const userRole = useSelector((state) => state.authToken.role)
    const navigate = useNavigate();
    const axiosInstance = AxiosInstance({
        "Content-Type": "application/json",
    });
  const [kycList, setKycList] = useState([]);

  useEffect(() => {
    const fetchKycList = async () => {
        await axiosInstance
        .get("/kyc/get")
        .then((response) => {
          setKycList(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchKycList();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await axiosInstance
    .patch(`/kyc/${id}`, { status, role: userRole })
    .then((response) => {
      navigate("/login")
    })
    .catch((error) => {
      console.log(error);
  });
  };

  return (
    <div className='mt-4'>
      <h1>Admin Panel</h1>
      <div class="mt-4 relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full text-left table-auto min-w-max text-slate-800">
          <thead>
            <tr class="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {kycList.map((kyc) => (
              <tr class="hover:bg-slate-50" key={kyc._id}>
                <td>{kyc.name}</td>
                <td class="p-4">
                <p class="text-sm font-bold">
                  {kyc.name}
                </p>
              </td>
              <td class="p-4">
                <p class="text-sm font-bold">
                  {kyc.status}
                </p>
              </td>
              <td class="p-4">
                <p class="text-sm font-bold">
              <button
                onClick={() => handleUpdateStatus(kyc._id, 'Approved')}
                type="button"
                data-ripple-light="true"
                class="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateStatus(kyc._id, 'Rejected')}
                type="button"
                data-ripple-light="true"
                class="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              >
                Reject
              </button>
              </p>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
