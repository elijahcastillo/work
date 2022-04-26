import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  VERIFIED_TOKEN,
  LOG_OUT,
} from "./actions";

const LS_Token = localStorage.getItem("token");
const LS_Name = localStorage.getItem("name");
const LS_Email = localStorage.getItem("email");

const initalState = {
  isAuthenticated: false,
  token: LS_Token || "",
  user: {
    name: LS_Name || "",
    email: LS_Email || "",
  },
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const registerUser = async (name, email, password) => {
    try {
      //post data to server
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      //get response from server
      console.log(response.data);
      const token = response.data.token;
      const n_name = response.data.user.name;
      const n_email = response.data.user.email;

      //set local storage
      localStorage.setItem("token", token);
      localStorage.setItem("name", n_name);
      localStorage.setItem("email", n_email);

      //verify token
      const isVerify = await verifyToken(token);

      //send data to reducer
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          token: token,
          user: {
            name: n_name,
            email: n_email,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      //send data to post
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      //get response
      console.log(response.data);
      const token = response.data.token;
      const n_name = response.data.user.name;
      const n_email = response.data.user.email;

      //set local storage
      localStorage.setItem("token", token);
      localStorage.setItem("name", n_name);
      localStorage.setItem("email", n_email);

      //verify token
      const isVerify = await verifyToken(token);

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          token: token,
          user: {
            name: n_name,
            email: n_email,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/auth/verify", {
        headers: {
          token: token,
        },
      });
      //console.log(response, "EVRRVRVRR");
      dispatch({ type: VERIFIED_TOKEN, payload: { auth: response.data } });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      dispatch({ type: LOG_OUT });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ ...state, registerUser, loginUser, verifyToken, logoutUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initalState, useAppContext };
