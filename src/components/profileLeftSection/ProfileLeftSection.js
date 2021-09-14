import React, { useContext, useEffect, useState } from "react";
import "./profileLeftSection.scss";
import { Cake, LocationOn, Favorite, Wc, Edit } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "../../axios";
import { fetchFriends, removeFriend } from "../../utils/friends";
import { IconButton } from "@material-ui/core";

function ProfileLeftSection({ profileUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userId = useParams().id;
  const history = useHistory();
  const [friends, setFriends] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const [isFriend, setIsFriend] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFriend(user.friends.includes(userId) ? true : false);
    }

    return () => {
      setIsFriend(null);
    };
  }, [user, userId]);

  useEffect(() => {
    profileUser &&
      setRequestSent(
        profileUser.friendRequests.includes(user._id) ? true : false
      );

    return () => {
      setRequestSent(false);
    };
  }, [profileUser, user]);

  useEffect(() => {
    const friends = async () => {
      const data = await fetchFriends(userId);
      setFriends(data);
    };
    friends();

    return () => {
      setFriends([]);
    };
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
        <div className="top">
          <h4>User Information</h4>
          {profileUser._id === user._id && (
            <IconButton
              style={{ width: "2.5rem", height: "2.5rem" }}
              onClick={() => history.push(`/edit-details/${profileUser._id}`)}
            >
              <Edit style={{ color: "#01a3a4" }} />
            </IconButton>
          )}
        </div>
        <div className="details">
          <Wc className="logo" />
          <span>Gender:</span>
          <span>{profileUser.gender}</span>
        </div>
        <div className="details">
          <Cake className="logo" />
          <span>D.O.B:</span>
          <span>
            {profileUser.dob ? profileUser.dob.split("T")[0] : "Not Available"}
          </span>
        </div>
        <div className="details">
          <LocationOn className="logo" />
          <span>City:</span>
          <span>{profileUser.city ? profileUser.city : "Not Available"}</span>
        </div>
        <div className="details">
          <Favorite className="logo" />
          <span>Relationship:</span>
          <span>
            {profileUser.relationship
              ? profileUser.relationship
              : "Not Available"}
          </span>
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
                    <img
                      src={
                        friends.profilePicture
                          ? PF + friends.profilePicture
                          : PF + "noProfilePic.png"
                      }
                      alt=""
                    />
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
