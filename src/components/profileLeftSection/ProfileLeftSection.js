import React, { useContext, useEffect, useState } from "react";
import "./profileLeftSection.scss";
import { Cake, LocationOn, Favorite, Home, Wc } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";
import fetchFriends from "../../utils/fetchFriends";

function ProfileLeftSection() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userId = useParams().id;
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const [isFriend, setIsFriend] = useState(null);

  useEffect(() => {
    user && setIsFriend(user.friends.includes(userId) ? true : false);
  }, [user, userId]);

  useEffect(() => {
    const friends = async () => {
      const data = await fetchFriends(userId);
      setFriends(data);
    };
    friends();
  }, [userId]);

  const handleFriend = async () => {
    //
  };

  return (
    <div className="profile_left">
      {user._id !== userId && (
        <div className="followOption">
          <button onClick={handleFriend}>
            <span>{isFriend ? "Unfriend" : "Add Friend"}</span>
            {isFriend ? <Remove /> : <Add />}
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
          <Home className="logo" />
          <span>Place:</span>
          <span>Amer</span>
        </div>
        <div className="details">
          <Favorite className="logo" />
          <span>Relationship:</span>
          <span>Commited</span>
        </div>
      </div>
      <div className="friends_div">
        <h4>User Friends</h4>
        <div className="followings">
          {friends &&
            friends.map((friends) => {
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
      </div>
    </div>
  );
}

export default ProfileLeftSection;
