import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import "./profile.scss";
// import { Panorama, AddAPhoto } from "@material-ui/icons";
import ProfileLeftSection from "../../components/profileLeftSection/ProfileLeftSection";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

function Profile() {
  const [profileUser, setProfileUser] = useState(null);
  const profileId = useParams().id;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${profileId}`);
      setProfileUser(res.data);
    };

    fetchUser();

    return () => {
      setProfileUser(null);
    };
  }, [profileId]);

  return (
    <>
      <Navbar />
      {profileUser ? (
        <div className="timeline">
          <div className="timeline_top">
            <picture className="coverImage"></picture>
            <div className="add_Image">
              {/* {user._id === profileId && <Panorama className="panorama_Icon" />} */}
              <div className="userName">
                <h2>
                  {profileUser &&
                    profileUser.firstName + " " + profileUser.lastName}
                </h2>
              </div>
            </div>
            <div className="profile_pic">
              {profileUser && (
                <img
                  src={
                    profileUser.profilePicture
                      ? PF + profileUser.profilePicture
                      : PF + "noProfilePic.png"
                  }
                  alt=""
                />
              )}
              {/* {user._id === profileId && <AddAPhoto className="add_profilePic" />} */}
            </div>
          </div>
          <div className="timeline_bottom">
            <ProfileLeftSection profileUser={profileUser} />
            <Feed profileUserId={profileId} />
          </div>
        </div>
      ) : (
        <div className="loading">
          <CircularProgress style={{ color: "#2c2c54" }} />
        </div>
      )}
    </>
  );
}

export default Profile;
