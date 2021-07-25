import React, { useContext, useEffect, useState } from "react";
import "./profileLeftSection.scss";
import { Cake, LocationOn, Favorite, Home, Wc } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";

function ProfileLeftSection() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userId = useParams().id;
  const [followings, setFollowings] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(user.following.includes(userId));
  console.log(user.following.includes(userId),followed)
  useEffect(() => {
    const friends = async () => {
      try {
        const res = await axios.get(`/users/friends/${userId}`);
        setFollowings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    friends();
  }, [userId]);

  const handleFollowUnfollow = async () => {
    const data = { userId: user._id };
    try {
      if (followed) {
        await axios.put(`/users/${userId}/unfollow`, data);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${userId}/follow`, data);
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <div className="profile_left">
      {user._id !== userId && (
        <div className="followOption">
          <button onClick={handleFollowUnfollow}>
            <span>{followed ? "Unfollow" : "Follow"}</span>
            {followed ? <Remove /> : <Add />}
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
        <h4>User Followings</h4>
        <div className="followings">
          {followings &&
            followings.map((following) => {
              return (
                <Link
                  to={`/profile/${following._id}`}
                  className="followings_user"
                  key={following._id}
                >
                  <picture>
                    <img src={PF + "noProfilePic.png"} alt="" />
                  </picture>
                  <span className="name">{following.firstName}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProfileLeftSection;
