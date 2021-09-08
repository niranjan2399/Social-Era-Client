import React, { useContext, useEffect, useState } from "react";
import Online from "../online/Online";
import axios from "../../axios";
import { AuthContext } from "../../authContext/AuthContext";
import "./rightSection.scss";
import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { CheckCircleOutline, ExpandMore, PersonAdd } from "@material-ui/icons";
import FriendRequestCard from "../friendRequestCard/FriendRequestCard";

function RightSection() {
  const [suggestions, setSuggestions] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/users/suggestions/${user._id}`);

      setSuggestions(res.data);
    })();
  }, [user]);

  return (
    <div className="right_section">
      <Online />
      <div className="right_section__suggestions">
        <span className="suggestions__Title">Friend Suggestions</span>
        <div className="suggestion__main">
          {suggestions ? (
            suggestions.map((u, i) => {
              return <FriendRequestCard key={i} user={u} />;
            })
          ) : (
            <CircularProgress
              style={{
                color: "#40407A",
                width: "1.75rem",
                height: "1.75rem",
                marginTop: ".5rem",
              }}
            />
          )}
          {suggestions && (
            <div>
              <button className="button">
                Show more <ExpandMore style={{ marginLeft: ".25rem" }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightSection;
