import React, { useContext, useEffect, useState } from "react";
import "./post.scss";
import {
  MoreVert,
  ThumbUpAltOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

function Post({ post }) {
  const [postUser, setPostUser] = useState([]);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setPostUser(res.data);
      post.likes.includes(currentUser._id) && setIsLiked(true);
    };
    fetchUser();
  }, [post.userId, post.likes, currentUser._id]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    isLiked ? setIsLiked(false) : setIsLiked(true);
    setLikes(isLiked ? likes - 1 : likes + 1);
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
          <span className="time">{format(post.createdAt)}</span>
        </div>
        <div className="right">
          <MoreVert className="more" />
        </div>
      </div>
      <div className="mid">
        <span className="text">{post.desc}</span>
        <picture className="postImage">
          <img
            src={
              post.img
                ? PF + post.img
                : "https://images.unsplash.com/photo-1545284234-f4821630060b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHNwbGFzaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            }
            alt=""
          />
        </picture>
      </div>
      <div className="bottom">
        <div className="left">
          <ThumbUpAltOutlined className="thumbUp" onClick={likeHandler} />
          <FavoriteBorderOutlined className="like" onClick={likeHandler} />
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
