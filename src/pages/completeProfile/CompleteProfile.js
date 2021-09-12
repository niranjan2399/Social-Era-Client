import React from "react";
import "./completeProfile.scss";

const CompleteProfile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="cpContainer">
      <div className="cpContainer__main">
        <div className="cpContainer__top">
          <h3>Complete Your Profile</h3>
        </div>
        <form>
          <div className="cpContainer__profilePic">
            <span>Profile Picture</span>
            <div className="cpContainer__images">
              <div className="cpContainer__imageContainer">
                <input type="radio" name="image" value="av1.png" id="image" />
                <label htmlFor="image">
                  <img src={PF + "av1.png"} alt="" />
                </label>
              </div>
              <div className="cpContainer__imageContainer">
                <input type="radio" name="image" value="av2.png" id="image2" />
                <label htmlFor="image2">
                  <img src={PF + "av2.png"} alt="" />
                </label>
              </div>
              <div className="cpContainer__imageContainer">
                <input type="radio" name="image" value="av3.png" id="image3" />
                <label htmlFor="image3">
                  <img src={PF + "av3.png"} alt="" />
                </label>
              </div>
              <div className="cpContainer__imageContainer">
                <input type="radio" name="image" value="av4.png" id="image4" />
                <label htmlFor="image4">
                  <img src={PF + "av4.png"} alt="" />
                </label>
              </div>
            </div>
            <div className="cpContainer__dob">
              <label htmlFor="date">Date Of Birth</label>
              <input type="date" name="date" id="date" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
