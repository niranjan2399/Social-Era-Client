import React from "react";
import "./timelineLeftSection.scss";
import { Cake, LocationOn, Favorite, Home, Wc } from "@material-ui/icons";

function TimelineLeftSection() {
  return (
    <div className="timeline_left">
      <div className="userInfo">
        <h4>User Information</h4>
        <div className="details">
          <Wc className='logo'/>
          <span>Gender:</span>
          <span>Male</span>
        </div>
        <div className="details">
          <Cake className='logo'/>
          <span>D.O.B:</span>
          <span>1.2.3</span>
        </div>
        <div className="details">
          <LocationOn className='logo'/>
          <span>City:</span>
          <span>Jaipur</span>
        </div>
        <div className="details">
          <Home className='logo'/>
          <span>Place:</span>
          <span>Amer</span>
        </div>
        <div className="details">
          <Favorite className='logo'/>
          <span>Relationship:</span>
          <span>Commited</span>
        </div>
      </div>
    </div>
  );
}

export default TimelineLeftSection;
