import React, { useState } from "react";
import "../assets/css/Register.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const { registerUser } = useAppContext();

  const { name, email, password } = inputs;

  const onSubmitForm = async () => {
    await registerUser(name, email, password);
    navigate("/");
  };

  return (
    <div className="center">
      <div className="container">
        <div className="login_container">
          <h1>Register</h1>

          <div className="login_inp">
            <div className="inp">
              <label>Name</label>
              <input
                type="text"
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </div>

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
            <button onClick={() => onSubmitForm()}>Submit</button>
            <Link to="/login" className="reg">
              Already a Member? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
