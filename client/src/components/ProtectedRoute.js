import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  let navigate = useNavigate();
  const { isAuthenticated, verifyToken } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      const persist = async () => {
        const n_token = localStorage.getItem("token");

        if (!n_token) {
          console.log("NO TOKEN");
          return;
        }

        const per = await verifyToken(n_token);
        return per;
      };
      const peer = await persist();

      console.log(peer, "PERSIST");

      if (peer == false) {
        return navigate("/login");
      }
      if (peer == true) {
        return;
      }

      if (!isAuthenticated) {
        return navigate("/login");
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  return children;
};

export default ProtectedRoute;
