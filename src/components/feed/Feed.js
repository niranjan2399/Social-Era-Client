import React, { useEffect, useContext } from "react";
import Share from "../share/Share";
import Post from "../posts/Post";
import axios from "../../axios";
import "./feed.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { PostContext } from "../../postContext/postContext";
import { CircularProgress } from "@material-ui/core";

function Feed({ profileUserId }) {
  const { user } = useContext(AuthContext);
  const { post, dispatch } = useContext(PostContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = profileUserId
        ? await axios.get(`/posts/profile/${profileUserId}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      const sortedPosts = res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      dispatch({ type: "FETCH_POST", payload: sortedPosts });
    };
    fetchPosts();
  }, [profileUserId, user._id, dispatch]);

  return (
    <div className="feed">
      {profileUserId ? user._id === profileUserId && <Share /> : <Share />}
      {post ? (
        post.map((p) => {
          return p && <Post key={p._id} post={p} />;
        })
      ) : (
        <div style={{ width: "100%", textAlign: "center", marginTop: "5rem" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Feed;
