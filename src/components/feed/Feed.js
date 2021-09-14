import React, { useEffect, useContext, useState } from "react";
import Share from "../share/Share";
import Post from "../posts/Post";
import axios from "../../axios";
import "./feed.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Warning } from "@material-ui/icons";

function Feed({ profileUserId }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      const res = profileUserId
        ? await axios.get(`/posts/profile/${profileUserId}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      const sortedPosts = res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setPosts(sortedPosts);
    })();

    return () => {
      setPosts(null);
    };
  }, [profileUserId, user]);

  return (
    <div className="feed">
      {profileUserId ? (
        user._id === profileUserId && <Share setPosts={setPosts} />
      ) : (
        <Share setPosts={setPosts} />
      )}
      {posts ? (
        posts.length ? (
          posts.map((p) => {
            return p && <Post key={p._id} post={p} setPosts={setPosts} />;
          })
        ) : (
          <div className="err">
            <Warning style={{ marginRight: ".5rem" }} /> Add friends or post to
            show feed
          </div>
        )
      ) : (
        <div style={{ width: "100%", textAlign: "center", marginTop: "5rem" }}>
          <CircularProgress
            style={{ color: "#40407A", width: "2rem", height: "2rem" }}
          />
        </div>
      )}
    </div>
  );
}

export default Feed;
