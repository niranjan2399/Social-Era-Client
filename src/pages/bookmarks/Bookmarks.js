import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import LeftSection from "../../components/leftSection/LeftSection";
import Navbar from "../../components/navbar/Navbar";
import { CircularProgress } from "@material-ui/core";
import axios from "../../axios";
import "./bookmarks.scss";
import Post from "../../components/posts/Post";

const Bookmarks = () => {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/users/bookmarks/${user._id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }

      return () => {
        setPosts(null);
      };
    })();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="bookmarks__Container">
        <LeftSection />
        <div className="bookmarks__Main">
          {posts ? (
            <div>
              {posts.length ? (
                posts.map((post) => {
                  return <Post post={post} key={post._id} />;
                })
              ) : (
                <div
                  className="err"
                  style={{ marginTop: "3rem", marginInline: "2rem" }}
                >
                  No Posts Bookmarked
                </div>
              )}
            </div>
          ) : (
            <div className="progress">
              <CircularProgress
                style={{ color: "#40407A", width: "2rem", height: "2rem" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
