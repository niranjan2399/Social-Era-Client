import React, { useState, useEffect, useContext, useRef } from "react";
import "./online.scss";
import { ExpandLess } from "@material-ui/icons";
import axios from "../../axios";
import { AuthContext } from "../../authContext/AuthContext";

function Online({ data }) {
  const [online, setOnline] = useState();
  const { user: currentUser } = useContext(AuthContext);
  const friendsOnline = useRef();
  const icon = useRef();

  useEffect(() => {
    if (data) {
      console.log(data);
      setOnline(data);
    }

    return () => {
      setOnline(null);
    };
  }, [data]);

  function revealFriends() {
    friendsOnline.current.classList.toggle("reveal");
    icon.current.classList.toggle("reveal");
  }

  return (
    <div className="online">
      <div onClick={revealFriends} className="top">
        <p>Online Friends ({data && data.length > 1 ? data.length - 1 : 0})</p>
        <ExpandLess className="reveal_friends" ref={icon} />
      </div>
      <div className="friends_online" ref={friendsOnline}>
        {online && online.length > 1 ? (
          online
            .filter((user) => {
              return user.userId !== currentUser._id;
            })
            .map((user, i) => {
              return <Friends key={i} user={user} />;
            })
        ) : (
          <div className="friends_online--empty">No User Online</div>
        )}
      </div>
    </div>
  );
}

function Friends({ user }) {
  const [friend, setFriend] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await axios.get(`/users/${user.userId}`);
        setFriend(res.data);
      })();
    }

    return () => {
      setFriend(null);
    };
  }, [user]);

  return (
    <div className="friend_div">
      {friend && (
        <>
          <div className="profile_pic">
            <div className="image">
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "noProfilePic.png"
                }
                alt=""
              />
            </div>
            <div className="indicator"></div>
          </div>
          <span className="friend_name">{friend.firstName}</span>
        </>
      )}
    </div>
  );
}

export default Online;
