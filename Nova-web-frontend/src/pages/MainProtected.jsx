import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authTokenActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios/axiosInstance";

const Main = () => {
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

    getUserData();
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
        Hello world
       </h1>
      <div>Protected Main</div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <button onClick={onLogout}>LogOut</button>
      </div>
      {userName !== "" && <div>{userName}</div>}
    </React.Fragment>
  );
};

export default Main;
