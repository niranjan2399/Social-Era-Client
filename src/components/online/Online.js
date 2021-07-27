import React from "react";
import "./online.scss";
import { ExpandLess } from "@material-ui/icons";

function Online() {
  function revealFriends() {
    const friends = document.querySelector(".friends_online");
    const reveal = document.querySelector(".reveal_friends");
    if (friends.hasAttribute("style")) {
      friends.removeAttribute("style");
      reveal.removeAttribute("style");
    } else {
      friends.setAttribute("style", "display: block");
      reveal.setAttribute("style", "transform: rotateZ(180deg)");
    }
  }

  return (
    <div className="online">
      <div onClick={revealFriends} className="top">
        <p>Online Friends</p>
        <ExpandLess className="reveal_friends" />
      </div>
      <div className="friends_online">
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
        <Friends />
      </div>
    </div>
  );
}

function Friends() {
  return (
    <div className="friend_div">
      <div className="profile_pic">
        <div className="image"></div>
        <div className="indicator"></div>
      </div>
      <span className="friend_name">Siddha</span>
    </div>
  );
}

export default Online;
