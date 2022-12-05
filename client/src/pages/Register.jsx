import { Link, useNavigate } from "react-router-dom";
import {useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";

function Register()
{
  const [file, setFile] = useState('');

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(); //"Please fill all the field" default err msg which will show on submit
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("file", file);


  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try {
      await axios.post("/uploaduserimg", formData)
      await axios.post("/auth/register",   {username, password, email, userImg:file?.name,
        created: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}).then(res=>
      {
        setTimeout(() =>
        {
          navigate("/login");
        }, 1000);
        if (res.status > 400)
        {
          setErr(res.response.data);
          setSuccess("");
          toast(res.data.msg);
        } else
        {
          setErr(" ");
          setSuccess(res.data.msg);
          toast(res.data.msg);
          setTimeout(() =>
          {
            navigate("/login");
          }, 1000);
        }
      })

    } catch (error)
    {
      setSuccess("");
      setErr(error.response.data);
      toast(error.response.data);
    }
  };
  return (
    <div className="auth">
      <div className="registerForm">
        <ToastContainer />
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              required
              autoComplete="off"
              autoFocus
              onChange={(e)=>setUsername(e.target.value)}
            />
            <span>Username</span>
            <i></i>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="email"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="input-group">
            <input
              type="file"
              name="file"
              id="file"
              // required
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              <div
                style={{ fontWeight: "normal", textDecoration: "underline" }}
              >
                Upload Image
              </div>{" "}
              {file && <div className="imagename">{file.name}</div>}
            </label>
          </div>
          <div className="input-group btn">
            <button>Register</button>
          </div>
        </form>
        <p className={err ? "error" : "success"}>
          {(err && err) || (success && success)}
        </p>

        <Link className="link" to="/login">
          Already Registered?
        </Link>
      </div>
    </div>
  );
}

export default Register;
