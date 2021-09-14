import React, { useContext, useRef, useState } from "react";
import "./share.scss";
import { PhotoLibrary, Cancel } from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "../../axios";

function Share({ setPosts }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef(null);
  const [file, setFile] = useState(null);

  const handleShare = async (e) => {
    e.preventDefault();
    if (desc.current.value !== "" || file !== null) {
      const newPost = {
        desc: desc.current.value,
        userId: user._id,
      };

      if (file) {
        const fileData = new FormData();
        const fileName = Date.now() + file.name;
        fileData.append("name", fileName);
        fileData.append("file", file);
        newPost.img = fileName;

        try {
          await axios.post("upload/", fileData);
        } catch (err) {
          console.log(err);
        }
      }

      try {
        const res = await axios.post("posts/", newPost);
        setPosts((post) => {
          return [{ ...res.data, userId: user }, ...post];
        });
        desc.current.value = "";
        setFile();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="share">
      <div className="input_text">
        <div className="profile_pic">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noProfilePic.png"
            }
            alt=""
          />
        </div>
        <input
          type="text"
          ref={desc}
          className="input_share"
          placeholder="What's on your mind?"
        />
      </div>
      <hr />
      {file && (
        <div className="imagePreview">
          <div className="image_div">
            <img src={URL.createObjectURL(file)} alt="" />
            <Cancel className="cancel" onClick={() => setFile(null)} />
          </div>
        </div>
      )}
      <form className="options share_form" onSubmit={handleShare}>
        <div className="option">
          <label htmlFor="file">
            <PhotoLibrary className="photoIcon" />
            <span>Add Image</span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <button type="submit">Share</button>
      </form>
    </div>
  );
}

export default Share;
