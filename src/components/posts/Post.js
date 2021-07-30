import React, { useContext, useEffect, useState } from "react";
import "./post.scss";
import { MoreVert, ThumbUpAltOutlined, ThumbUpAlt } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { PostContext } from "../../postContext/postContext";

function Post({ post }) {
  const [postUser, setPostUser] = useState([]);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setPostUser(res.data);
      post.likes.includes(currentUser._id) && setIsLiked(true);
    };
    fetchUser();
    return () => {
      setPostUser([]);
    };
  }, [post.userId, post.likes, currentUser._id]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    isLiked ? setIsLiked(false) : setIsLiked(true);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const toggleMoreOptions = (e) => {
    console.log("clicked");
  };

  const deletePost = async () => {
    await axios.delete(`/posts/${post._id}`, {
      data: { userId: currentUser._id },
    });
    dispatch({ type: "DELETE_POST", payload: post._id });
  };

  return (
    <div className="post">
      <div className="top">
        <div className="left">
          <Link to={`/profile/${post.userId}`} className="user_profile">
            <div className="profilePic">
              <img
                src={
                  postUser.profilePicture
                    ? PF + postUser.profilePicture
                    : PF + "noProfilePic.png"
                }
                alt=""
              />
            </div>
            <span className="username">
              {postUser.firstName + " " + postUser.lastName}
            </span>
          </Link>
          <span className="time">{moment(post.createdAt).fromNow()}</span>
        </div>
        {(postUser._id === currentUser._id || currentUser.isAdmin) && (
          <div className="right">
            <input type="radio" id={post.createdAt} name="radio_post" />
            <label htmlFor={post.createdAt} onClick={toggleMoreOptions}>
              <div
                className="moreOptions"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                }}
              >
                <MoreVert className="more" />
              </div>
            </label>
            <div className="more_options">
              <ul>
                <li>Edit</li>
                <li onClick={deletePost}>Delete</li>
              </ul>
            </div>
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
          <span className="comment">4 comments</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
