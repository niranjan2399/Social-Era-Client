import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import { AuthContext } from "../../authContext/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./completeProfile.scss";

const CompleteProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [relation, setRelation] = useState("");
  const { user, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const profileAvatars = ["av1.png", "av2.png", "av3.png", "av4.png"];
  const relations = ["Single", "Comitted", "Complicated"];

  useEffect(() => {
    if (user && history.location.pathname.split("/")[1] === "edit-details") {
      setAvatar(user.profilePicture);
      setDate(user.dob.split("T")[0]);
      setCity(user.city);
      setRelation(user.relationship);
    }

    return () => {
      setAvatar("");
      setDate("");
      setCity("");
      setRelation("");
    };
  }, [history.location.pathname, user]);

  const saveAndUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(`/users/${user._id}`, {
        userId: user._id,
        profilePicture: avatar,
        city,
        dob: date,
        relationship: relation,
      });

      if (res.data) {
        dispatch({ type: "LOGIN_START" });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setLoading(false);
        if (history.location.pathname.split("/")[1] === "edit-details") {
          history.goBack();
        } else {
          history.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cpContainer">
      <div className="cpContainer__main">
        <div className="cpContainer__top">
          <h3>
            {history.location.pathname.split("/")[1] === "edit-details"
              ? "Update Details"
              : "Complete Your Profile"}
          </h3>
        </div>
        <form onSubmit={saveAndUpdateProfile}>
          <div className="cpContainer__profilePic">
            <span>Profile Avatar</span>
            <div className="cpContainer__images">
              {user &&
                profileAvatars.map((name, i) => {
                  return (
                    <div key={name} className="cpContainer__imageContainer">
                      <input
                        type="radio"
                        name="image"
                        value={name}
                        {...(avatar === name
                          ? { checked: true }
                          : { checked: false })}
                        onChange={(e) => setAvatar(e.currentTarget.value)}
                        id={`image${i}`}
                      />
                      <label htmlFor={`image${i}`}>
                        <img src={PF + name} alt="" />
                      </label>
                    </div>
                  );
                })}
            </div>
            <div className="cpContainer__dob">
              <label htmlFor="date">Date Of Birth</label>
              <input
                type="date"
                name="date"
                max={new Date().toISOString().split("T")[0]}
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="cpContainer__relation">
              <span>Relationship Status</span>
              <div className="optionWrapper">
                {user &&
                  relations.map((rel) => {
                    return (
                      <div key={rel} className="option">
                        <input
                          type="radio"
                          name="relation"
                          id={rel}
                          value={rel}
                          {...(relation && relation === rel
                            ? { checked: true }
                            : { checked: false })}
                          onChange={(e) => setRelation(e.currentTarget.value)}
                        />
                        <label htmlFor={rel}>{rel}</label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="cpContainer__city">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button type="submit">
                {loading ? (
                  <CircularProgress
                    style={{ width: "1rem", height: "1rem", color: "white" }}
                  />
                ) : (
                  "Save"
                )}
              </button>
              {history.location.pathname.split("/")[1] === "edit-details" ? (
                user && (
                  <Link className="link" to={`/profile/${user._id}`}>
                    Cancel {">>"}
                  </Link>
                )
              ) : (
                <Link className="link" to="/">
                  Skip {">>"}
                </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
