import React, { useContext, useEffect, useState } from "react";
import "./post.scss";
import {
  ThumbUpAltOutlined,
  ThumbUpAlt,
  Edit,
  Delete,
  Bookmark,
  BookmarkBorder,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import axios from "../../axios";
import moment from "moment";
import { AuthContext } from "../../authContext/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Post({ post, setPosts }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [bookmarked, setBookmarked] = useState(
    currentUser && currentUser.bookmarks.includes(post._id)
  );
  const history = useHistory();

  useEffect(() => {
    if (post) {
      post.likes.includes(currentUser._id)
        ? setIsLiked(true)
        : setIsLiked(false);
      setLikes(post.likes.length);
    }
  }, [post, currentUser]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1);
    isLiked ? setIsLiked(false) : setIsLiked(true);
  };

  const deletePost = async () => {
    await axios.delete(`/posts/${post._id}`, {
      data: { userId: currentUser._id },
    });
    setPosts((p) => p.filter((doc) => doc._id !== post._id));
  };

  const handleBookmark = async () => {
    if (!bookmarked) {
      const res = await axios.put(`/users/add-bookmark/${post._id}`, {
        userId: currentUser._id,
      });

      if (res.data.ok) {
        currentUser.bookmarks.push(post._id);
        setBookmarked(true);
      }
    } else {
      const res = await axios.put(`/users/remove-bookmark/${post._id}`, {
        userId: currentUser._id,
      });

      if (res.data.ok) {
        const bookmarks = currentUser.bookmarks.filter(
          (bookmark) => bookmark !== post._id
        );
        currentUser.bookmarks = bookmarks;

        setBookmarked(false);
      }
    }
  };

  return (
    <div className="post">
      {post.userId && (
        <>
          <div className="top">
            <div className="left">
              <Link to={`/profile/${post.userId._id}`} className="user_profile">
                <div className="profilePic">
                  <img
                    src={
                      post.userId.profilePicture
                        ? PF + post.userId.profilePicture
                        : PF + "noProfilePic.png"
                    }
                    alt=""
                  />
                </div>
                <span className="username">
                  {post.userId.firstName + " " + post.userId.lastName}
                </span>
              </Link>
              <span className="time">{moment(post.createdAt).fromNow()}</span>
            </div>
            {(post.userId._id === currentUser._id || currentUser.isAdmin) && (
              <div className="right">
                <IconButton
                  color="inherit"
                  style={{ width: "2.25rem", height: "2.25rem" }}
                  onClick={() => history.push(`/post/${post._id}`)}
                >
                  <Edit className="rightIcon" />
                </IconButton>
                <IconButton
                  color="inherit"
                  style={{ width: "2.25rem", height: "2.25rem" }}
                  onClick={deletePost}
                >
                  <Delete
                    className="rightIcon"
                    style={{
                      color: "#d63031",
                    }}
                  />
                </IconButton>
              </div>
            )}
          </div>
          <div className="mid">
            {post.desc && <span className="text">{post.desc}</span>}
            {post.img && (
              <picture className="postImage">
                <img src={PF + post.img} alt="" />
              </picture>
            )}
          </div>
          <div className="bottom">
            <div className="left">
              {isLiked ? (
                <ThumbUpAlt className="thumbUp" onClick={likeHandler} />
              ) : (
                <ThumbUpAltOutlined className="thumbUp" onClick={likeHandler} />
              )}
              <span className="likeMessage">{likes} people liked it</span>
            </div>
            <div className="right">
              <IconButton
                style={{ width: "2.25rem", height: "2.25rem" }}
                onClick={handleBookmark}
              >
                {bookmarked ? (
                  <Bookmark className="icon" />
                ) : (
                  <BookmarkBorder className="icon" />
                )}
              </IconButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
