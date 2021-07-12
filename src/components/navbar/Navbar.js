import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navBar.scss";
import SearchBar from "../search/SearchBar";
import { Person } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { AuthContext } from "../../authContext/AuthContext";

function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <div className="hamburger">
          <input type="checkbox" className="menu-btn" id="menu-btn" />
          <label htmlFor="menu-btn" className="menu-icon">
            <span className="navicon"></span>
          </label>
        </div>
        <Link to="/" className="logo">
          <span>
            social
            <br /> era
          </span>
        </Link>
      </div>
      <SearchBar />
      <div className="right">
        <Link to={`/profile/${user._id}`} className="link_timeline">
          <div className="account_div">
            <div className="profile_pic">
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noProfilePic.png"
                }
                alt="ProfilePic"
              />
            </div>
            <div className="username">{user.firstName}</div>
          </div>
        </Link>
        <div className="person_div">
          <Person className="person" />
          <div>1</div>
        </div>
        <div className="notification_div">
          <NotificationsIcon className="noti" />
          <div>2</div>
        </div>
        <div className="more">
          <i className="lzf7d6o1"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
