import React from "react";
import Share from "../share/Share";
import Post from "../posts/Post";
import './feed.scss';

function Feed() {
  return (
    <div className='feed'>
			<Share />
			<Post />
    </div>
  );
}

export default Feed;