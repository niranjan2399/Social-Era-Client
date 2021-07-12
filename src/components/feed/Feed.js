import React, { useState, useEffect, useContext } from "react";
import Share from "../share/Share";
import Post from "../posts/Post";
import axios from "axios";
import "./feed.scss";
import { AuthContext } from "../../authContext/AuthContext";

function Feed({ profileUserId }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = profileUserId
        ? await axios.get(`/posts/profile/${profileUserId}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [profileUserId, user._id]);

  return (
    <div className="feed">
      <Share />
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}

export default Feed;
