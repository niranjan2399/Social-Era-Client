import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import LeftSection from "../../components/leftSection/LeftSection";
import { useState } from "react";
import axios from "../../axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { Delete, Image } from "@material-ui/icons";
import "./editPost.scss";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../authContext/AuthContext";

const EditPost = () => {
  const [desc, setDesc] = useState();
  const [removeImage, setRemoveImage] = useState(false);
  const [file, setFile] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [post, setPost] = useState(null);
  const id = useParams().id;
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useState(() => {
    (async () => {
      const res = await axios.get(`/posts/${id}`);
      setDesc(res.data.desc);
      !res.data.img && setRemoveImage(true);
      setPost(res.data);
    })();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (removeImage === true) {
      const res = await axios.put(`/posts/${post._id}`, {
        desc,
        userId: user._id,
        img: "",
      });
      console.log(res);
    } else {
      const fileData = new FormData();
      const fileName = Date.now() + file.name;
      fileData.append("name", fileName);
      fileData.append("file", file);

      try {
        await axios.post("upload/", fileData);
        await axios.put(`/posts/${post._id}`, {
          userId: user._id,
          desc,
          img: fileName,
        });
      } catch (err) {
        console.log(err);
      }
    }

    history.push("/");
  };

  const handleDeleteImage = () => {
    setRemoveImage(true);
    setFile(null);
  };

  const handleImageChange = (e) => {
    setRemoveImage(false);
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className="editPost">
        <LeftSection />
        <div className="editPost__main">
          <h2>Edit Post</h2>
          {post ? (
            <form onSubmit={handleUpdate}>
              <div className="editPost__postContainer">
                <input
                  type="text"
                  autoFocus
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <div
                  className={
                    "editContainer__imageDiv" + (post.img ? " hover" : "")
                  }
                  {...(removeImage
                    ? { style: { ...{ backgroundColor: "#dfe6e9" } } }
                    : "")}
                >
                  {!removeImage ? (
                    <>
                      <img
                        src={file ? URL.createObjectURL(file) : PF + post.img}
                        alt=""
                      />
                      <div className="editPost__options">
                        <label htmlFor="file">
                          <Image />
                          <input
                            hidden
                            accept=".png,.jpg,.jpeg"
                            type="file"
                            id="file"
                            onChange={handleImageChange}
                          />
                        </label>
                        <button className="delete" onClick={handleDeleteImage}>
                          <Delete />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div> Please Upload Image To Preview</div>
                      <div className="editPost__noImg">
                        <label className="button button--noImg" htmlFor="file2">
                          Choose file
                          <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            id="file2"
                            hidden
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="editPost__buttons">
                <Link to="/" className="button button--cancel">
                  Cancel
                </Link>
                <button className="button button--update" type="submit">
                  Update
                </button>
              </div>
            </form>
          ) : (
            <div className="editPost__progress">
              <CircularProgress
                style={{ color: "#2c2c54", height: "2rem", width: "2rem" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPost;
