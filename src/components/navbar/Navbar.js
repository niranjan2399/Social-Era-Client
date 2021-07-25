import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navBar.scss";
import SearchBar from "../search/SearchBar";
import { Person, ArrowBack } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { AuthContext } from "../../authContext/AuthContext";
import { useHistory } from "react-router-dom";

function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const isMessengerPage = history.location.pathname;

  const revealMore = (e) => {
    const to_reveal = document.querySelector(".more_options");
    if (to_reveal.hasAttribute("style")) {
      to_reveal.removeAttribute("style");
    } else {
      to_reveal.setAttribute("style", "visibility: visible");
    }
  };

  const back = () => {
    history.goBack();
  };

  return (
    <div className="navbar">
      <div className="left">
        <div className="navigationIcon">
          {isMessengerPage === "/messenger" ? (
            <div className="back" onClick={back}>
              <ArrowBack />
            </div>
          ) : (
            <div className="hamburger">
              <input type="checkbox" className="menu-btn" id="menu-btn" />
              <label htmlFor="menu-btn" className="menu-icon">
                <span className="navicon"></span>
              </label>
            </div>
          )}
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
        <div className="link_timeline">
          <NavLink
            className="account_div"
            to={`/profile/${user._id}`}
            activeStyle={{
              backgroundColor: "#d1ccc02a",
              border: "1px solid yellow",
            }}
          >
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
          </NavLink>
        </div>
        <div className="person_div">
          <Person className="person" />
          <div>1</div>
        </div>
        <div className="notification_div">
          <NotificationsIcon className="noti" />
          <div>2</div>
        </div>
        <div className="more" onClick={revealMore}>
          <i className="lzf7d6o1"></i>
          <div className="more_options">
            <ul>
              <li>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
