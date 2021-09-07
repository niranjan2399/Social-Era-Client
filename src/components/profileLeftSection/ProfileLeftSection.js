import React, { useContext, useEffect, useState } from "react";
import "./profileLeftSection.scss";
import { Cake, LocationOn, Favorite, Home, Wc } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "../../axios";
import { fetchFriends, removeFriend } from "../../utils/friends";

function ProfileLeftSection({ profileUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userId = useParams().id;
  const [friends, setFriends] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const [isFriend, setIsFriend] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFriend(user.friends.includes(userId) ? true : false);
    }
  }, [user, userId]);

  useEffect(() => {
    profileUser &&
      setRequestSent(
        profileUser.friendRequests.includes(user._id) ? true : false
      );
  }, [profileUser, user]);

  useEffect(() => {
    const friends = async () => {
      const data = await fetchFriends(userId);
      setFriends(data);
    };
    friends();
  }, [userId]);

  const handleFriend = async () => {
    try {
      if (!requestSent && !isFriend) {
        const res = await axios.put(`users/send-friend-request/${userId}`, {
          userId: user._id,
        });

        res.data.ok && setRequestSent(true);
      } else if (requestSent) {
        const res = await axios.put(`users/remove-friend-request/${userId}`, {
          userId: user._id,
        });

        res.data.ok && setRequestSent(false);
      } else if (isFriend) {
        const res = await removeFriend(userId, { userId: user._id });

        if (res.data.ok) {
          setIsFriend(!isFriend);
          setFriends(friends.filter((friend) => friend._id !== user._id));
          dispatch({ type: "REMOVE_FRIEND", payload: userId });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile_left">
      {user._id !== userId && (
        <div className="followOption">
          <button onClick={handleFriend}>
            <span>
              {requestSent
                ? "Request Sent"
                : isFriend
                ? "Unfriend"
                : "Add Friend"}
            </span>
            {!requestSent && (isFriend ? <Remove /> : <Add />)}
          </button>
          <button>
            <span>Message</span>
            <Add />
          </button>
        </div>
      )}
      <div className="userInfo">
        <h4>User Information</h4>
        <div className="details">
          <Wc className="logo" />
          <span>Gender:</span>
          <span>Male</span>
        </div>
        <div className="details">
          <Cake className="logo" />
          <span>D.O.B:</span>
          <span>1.2.3</span>
        </div>
        <div className="details">
          <LocationOn className="logo" />
          <span>City:</span>
          <span>Jaipur</span>
        </div>
        <div className="details">
          <Favorite className="logo" />
          <span>Relationship:</span>
          <span>Commited</span>
        </div>
      </div>
      <div className="friends_div">
        <h4>User Friends</h4>
        {friends && friends.length ? (
          <div className="followings">
            {friends.map((friends) => {
              return (
                <Link
                  to={`/profile/${friends._id}`}
                  className="followings_user"
                  key={friends._id}
                >
                  <picture>
                    <img src={PF + "noProfilePic.png"} alt="" />
                  </picture>
                  <span className="name">{friends.firstName}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="err">No Friends Found</div>
        )}
      </div>
    </div>
  );
}

export default ProfileLeftSection;
