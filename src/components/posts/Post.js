import React, { useEffect, useState } from "react";
import "./post.scss";
import {
  MoreVert,
  ThumbUpAltOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { format } from 'timeago.js';

function Post({ post }) {
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      setUserPost(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="top">
        <div className="left">
          <div className="profile"></div>
          <span className="username">{ userPost.username }</span>
          <span className="time">{ format(post.createdAt)}</span>
        </div>
        <div className="right">
          <MoreVert className="more" />
        </div>
      </div>
      <div className="mid">
        <span className="text">{post.desc}</span>
        <picture className="postImage">
          <img
            src="https://images.unsplash.com/photo-1545284234-f4821630060b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHNwbGFzaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
        </picture>
      </div>
      <div className="bottom">
        <div className="left">
          <ThumbUpAltOutlined className="thumbUp" />
          <FavoriteBorderOutlined className="like" />
          <span className="likeMessage">7 people liked it</span>
        </div>
        <div className="right">
          <span className="comment">4 comments</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
