import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { IconButton, Tooltip } from "@material-ui/core";
import { CheckCircleOutline, PersonAdd } from "@material-ui/icons";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

const FriendRequestCard = ({ user }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [sendRequest, setSendRequest] = useState();
  const history = useHistory();

  useEffect(() => {
    currentUser &&
      user.friendRequests &&
      setSendRequest(
        user.friendRequests.includes(currentUser._id) ? true : false
      );
  }, [currentUser, user]);

  const handleFriendRequest = async (e) => {
    try {
      if (!sendRequest) {
        const res = await axios.put(
          `users/send-friend-request/${e.currentTarget.dataset.friend_id}`,
          {
            userId: currentUser._id,
          }
        );
        res.data.ok && setSendRequest(true);
      } else {
        const res = await axios.put(
          `users/remove-friend-request/${e.currentTarget.dataset.friend_id}`,
          {
            userId: currentUser._id,
          }
        );

        res.data.ok && setSendRequest(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfilePush = (e) => {
    history.push(`/profile/${e.currentTarget.dataset.friend_id}`);
  };

  return (
    <div className="suggestion__user">
      <div
        className="cover"
        onClick={handleProfilePush}
        data-friend_id={user._id}
      >
        <div className="user__pic"></div>
        <div className="user__details">
          <div>
            <span>{user.firstName + " " + user.lastName}</span>
          </div>
        </div>
      </div>
      <div
        className="options"
        data-friend_id={user._id}
        onClick={handleFriendRequest}
      >
        {sendRequest ? (
          <Tooltip title="Already Sent" placement="top">
            <IconButton style={{ width: "2.75rem", height: "2.75rem" }}>
              <CheckCircleOutline />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Send Request" placement="top">
            <IconButton style={{ width: "2.75rem", height: "2.75rem" }}>
              <PersonAdd />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default FriendRequestCard;
