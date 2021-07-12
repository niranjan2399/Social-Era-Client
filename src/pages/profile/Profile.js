import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import "./profile.scss";
import { Panorama, AddAPhoto } from "@material-ui/icons";
import TimelineLeftSection from "../../components/timelineLeftSection/TimelineLeftSection";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router";

function Profile() {
  const [user, setUser] = useState({});
  const profileId = useParams().id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${profileId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [profileId]);

  return (
    <>
      <Navbar />
      <div className="timeline">
        <div className="timeline_top">
          <picture className="coverImage"></picture>
          <div className="add_Image">
            <Panorama className="panorama_Icon" />
            <div className="userName">
              <h2>{user.firstName + " " + user.lastName}</h2>
            </div>
          </div>
          <div className="profile_pic">
            {/* <img src='' alt="" /> */}
            <AddAPhoto className="add_profilePic" />
          </div>
        </div>
        <div className="timeline_bottom">
          <TimelineLeftSection />
          <Feed profileUserId={profileId} />
        </div>
      </div>
    </>
  );
}

export default Profile;
