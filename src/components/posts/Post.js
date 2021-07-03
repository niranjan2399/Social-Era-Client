import React from "react";
import "./post.scss";
import {
  MoreVert,
  ThumbUpAltOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

function Post() {
  return (
    <div className="post">
      <div className="top">
        <div className="left">
          <div className="profile"></div>
          <span className="username">Siddha</span>
          <span className="time">5 mins ago</span>
        </div>
        <div className="right">
          <MoreVert className="more" />
        </div>
      </div>
      <div className="mid">
        <span className="text">Hello World!</span>
        <picture className="postImage"></picture>
      </div>
      <div className="bottom">
        <div className="left">
          <ThumbUpAltOutlined className="thumbUp" />
          <FavoriteBorderOutlined className="like" />
          <span className="likeMessage">7 people liked it</span>
				</div>
				<div className="right">
					<span className='comment'>4 comments</span>
				</div>
      </div>
    </div>
  );
}

export default Post;
