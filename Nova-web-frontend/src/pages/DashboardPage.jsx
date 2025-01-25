import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authTokenActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios/axiosInstance";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.authToken.userId);
  const [userName, setUsername] = useState("");

  const axiosInstance = AxiosInstance({
    "Content-Type": "application/json",
  });

  useEffect(() => {
    const getUserData = async () => {
      await axiosInstance
        .get("/auth/getUser/" + userId)
        .then((response) => {
          console.log(response);
          setUsername(response.data.user.email);
          dispatch(authTokenActions.addUser(response.data.user.role))
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if(userId) {
      getUserData();
    }
  }, []);

  const onLogout = async () => {
    await axiosInstance
      .get("/auth/logout")
      .then((response) => {
        console.log(response);
        dispatch(authTokenActions.deleteToken());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
       <h1 class="text-3xl font-bold underline">
          Dashboard Page
       </h1>
      <div style={{ display: "flex", justifyContent: 'center', flexDirection: "row", gap: "10px" }}>
        {userId && 
          <button
          onClick={onLogout}
          type="button"
          data-ripple-light="true"
          class="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Log Out
        </button>
        }
      </div>
      
      

      {userName !== "" && <div>{userName}</div>}
    </React.Fragment>
  );
};

export default Dashboard;
