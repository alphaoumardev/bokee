import { Link } from "react-router-dom";
import logo from "./../img/log.png";
import React, { useContext} from "react";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    const notify = () => toast(res.data);
    notify();
  };

  let write = currentUser ? "/write" : "/login";

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Shaheb 10" width={50} />
        </Link>
      </div>
      <div className="menu">
        <Link className="link" to="/?cat=art">
          <h6>Art</h6>
        </Link>
        <Link className="link" to="/?cat=science">
          <h6>Science</h6>
        </Link>
        <Link className="link" to="/?cat=technology">
          <h6>Technology</h6>
        </Link>
        <Link className="link" to="/?cat=cinema">
          <h6>Cinema</h6>
        </Link>
        <Link className="link" to="/?cat=design">
          <h6>Design</h6>
        </Link>
        <Link className="link" to="/?cat=food">
          <h6>Food</h6>
        </Link>
        <span>
          <Link
            className="link" style={{color:"red",}}
            to={`/?author=${currentUser?.username}&authorId=${currentUser?.id}`}
          >
            <img
                src={`../../user/${currentUser?.userImg}`}
                alt={''}
                width={30} style={{borderRadius:50}}
            />
            {/*{(currentUser &&*/}
            {/*  currentUser.username.includes("@") &&*/}
            {/*  currentUser.username.split("@")[0]) ||*/}
            {/*  (currentUser && currentUser.username)}*/}
          </Link>
        </span>
        <span>
          {(currentUser && (
            <Link className="link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          )) ||
            (!currentUser && (
              <Link className="link" to="/login">
                Login
              </Link>
            ))}
        </span>
        <span className="write">
          <Link className="link" to={write}>
            Write
          </Link>
        </span>
        {<ToastContainer />}
      </div>
    </div>
  );
}

export default Navbar;
