import React, { useState } from "react";
import "../assets/css/Login.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useAppContext();
  let navigate = useNavigate();

  const { email, password } = inputs;

  const onSubmit = async () => {
    await loginUser(email, password);
    navigate("/");
  };

  return (
    <div className="center">
      <div className="container">
        <div className="login_container">
          <h1>Login</h1>

          <div className="login_inp">
            <div className="inp">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>

            <div className="inp">
              <label>Password</label>
              <input
                type="text"
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="sub">
            <button onClick={() => onSubmit()}>Submit</button>
            <Link to="/register" className="reg">
              Not a Member? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
