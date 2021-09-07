import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./navBar.scss";
import SearchBar from "../search/SearchBar";
import { Home, People, Warning } from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";
import { Badge } from "@material-ui/core";
import { removeRequest, addFriend } from "../../utils/friends";
import axios from "../../axios";

function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  const path = useHistory().location.pathname;
  const history = useHistory();
  let navOpened = false;

  const acceptFriend = async (e) => {
    const friendId = e.currentTarget.parentElement.dataset.friend_id;

    const res = await addFriend(friendId, { userId: user._id });
    const res2 = await removeRequest(friendId, { userId: user._id });
    await Promise.all([res, res2]).then(() => {
      dispatch({ type: "ADD_FRIEND", payload: friendId });
    });
  };

  const ignoreFriendRequest = async (e) => {
    const friendId = e.currentTarget.parentElement.dataset.friend_id;

    const res = await removeRequest(friendId, { userId: user._id });
    res.data.ok && dispatch({ type: "IGNORE_FRIEND", payload: friendId });
  };

  const handleProfilePush = (e) => {
    history.push(`/profile/${e.currentTarget.dataset.friend_id}`);
  };

  const revealLeftSection = (e) => {
    navOpened = !navOpened;
    if (navOpened) {
      document.querySelector(".left_section").setAttribute("style", "left: 0");

      if (path !== "/messenger") {
        document
          .querySelector(".navigation_overlay")
          .setAttribute("style", "display: unset");
        document
          .querySelector("body")
          .setAttribute("style", "overflow-y: hidden");
      } else {
        document
          .querySelector(".navigation_overlay")
          .setAttribute("style", "display: unset");
      }
    } else {
      document.querySelector(".left_section").removeAttribute("style");

      if (path !== "/messenger") {
        setTimeout(() => {
          document
            .querySelector(".navigation_overlay")
            .removeAttribute("style");
          document.querySelector("body").removeAttribute("style");
        }, 250);
      } else {
        document.querySelector(".navigation_overlay").removeAttribute("style");
      }
    }
  };

  return (
    <>
      <div className="navigation_overlay"></div>
      <div className="navbar">
        <div className="left">
          <div className="navigationIcon">
            {path.split("/")[1] !== "profile" ? (
              <div className="hamburger">
                <input
                  type="checkbox"
                  className="menu-btn"
                  id="menu-btn"
                  onChange={revealLeftSection}
                />
                <label htmlFor="menu-btn" className="menu-icon">
                  <span className="navicon"></span>
                </label>
              </div>
            ) : (
              <Link className="home" to="/">
                <Home style={{ fontSize: "2rem" }} />
              </Link>
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
          <div
            className="more person__div"
            style={{ width: "2.25rem", height: "2.25rem" }}
            tabIndex="0"
          >
            <Badge badgeContent={user.friendRequests.length} color="secondary">
              <People className="person" style={{ color: "white" }} />
            </Badge>
            <div className="person__friendRequests">
              <div className="request">
                {user && user.friendRequests.length ? (
                  user.friendRequests.map((friend) => {
                    return (
                      <div className="user" key={friend._id}>
                        <div
                          className="main"
                          onClick={handleProfilePush}
                          data-friend_id={friend._id}
                        >
                          <div className="profilePic"></div>
                          <div className="name">
                            {friend.firstName} {friend.lastName}
                          </div>
                        </div>
                        <div className="options" data-friend_id={friend._id}>
                          <div onClick={ignoreFriendRequest}>Ignore</div>
                          <div onClick={acceptFriend}>Accept</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="err">
                    <Warning style={{ marginRight: ".5rem" }} /> No Friend
                    Requests
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="more" tabIndex="0">
            <i className="lzf7d6o1"></i>
            <div className="more_options">
              <ul>
                <li>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
