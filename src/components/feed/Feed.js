import React, { useState, useEffect } from "react";
import Share from "../share/Share";
import Post from "../posts/Post";
import axios from "axios";
// import { useParams } from "react-router";
import "./feed.scss";

function Feed() {
  const [posts, setPosts] = useState([]);
  // const params = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/timeline/60de97891e5abf07942a58be");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

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
