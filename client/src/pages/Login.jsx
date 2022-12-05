import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";

function Login()
{
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(""); //"Please fill all the field" default err msg which will show on submit
  const [success, setSuccess] = useState("");
  //Context Api for Authentication
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleInputChange = (e) =>
  {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    try {
      const res = await login(input);

      navigate("/");

      if (res.status > 400)
      {
        setErr(res.response.data);
        setSuccess("");
        toast(res.response.data);
      } else {
        setSuccess(res.data);
        setErr("");
        toast(res.data);
      }

      setSuccess("Login Successfull, Redirecting you to home page...");
      toast("Login Successfull, Redirecting you to home page...");
    } catch (error)
    {
      if (error.response.status >= 500)
      {
        setErr("Cant Login, Please check your network");
        toast("Cant Login, Please check your network");
        return;
      } else if (error.response.status >= 300 && error.response.status <= 500)
      {
        setErr(error.response.data);
        toast(error.response.data);
        return;
      }
      setErr("Cant Login, Check Username and Password");
      toast("Cant Login, Check Username and Password");
      setSuccess("");
    }
  };

  return (
    <div className="auth">
      <div className="loginForm">
        <ToastContainer />
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              required
              autoComplete="off"
              autoFocus
              onChange={handleInputChange}
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              onChange={handleInputChange}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="input-group btn">
            <button>Login</button>
          </div>
        </form>
        <p className={err ? "error" : "success"}>
          {(err && err) || (success && success)}
        </p>
        <Link className="link" to="/register">
          Do not have an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;
