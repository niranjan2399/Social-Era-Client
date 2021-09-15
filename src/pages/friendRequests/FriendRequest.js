import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import LeftSection from "../../components/leftSection/LeftSection";
import Navbar from "../../components/navbar/Navbar";
import { addFriend, removeRequest } from "../../utils/friends";
import "./friendRequest.scss";

const FriendRequest = () => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();

  const handleProfilePush = (e) => {
    history.push(`/profile/${e.currentTarget.dataset.friend_id}`);
  };

  const acceptFriend = async (e) => {
    const friendId = e.currentTarget.parentElement.dataset.friend_id;

    const res = await addFriend(friendId, { userId: user._id });
    const res2 = await removeRequest(friendId, { userId: user._id });
    await Promise.all([res, res2]).then(() => {
      dispatch({ type: "ADD_FRIEND", payload: friendId });
    });
  };

  const ignoreFriendRequest = async (e) => {
    const friendId = e.currentTarget.parentElement.dataset.friend_id;

    const res = await removeRequest(friendId, { userId: user._id });
    res.data.ok && dispatch({ type: "IGNORE_FRIEND", payload: friendId });
  };

  return (
    <>
      <Navbar />
      <div className="frContainer">
        <LeftSection />
        <div className="frContainer__options">
          {user && user.friendRequests.length ? (
            user.friendRequests.map((friend) => {
              return (
                <div className="user page" key={friend._id}>
                  <div
                    className="main"
                    onClick={handleProfilePush}
                    data-friend_id={friend._id}
                  >
                    <div className="profilePic">
                      <img
                        src={
                          friend.profilePicture
                            ? PF + friend.profilePicture
                            : PF + "noProfilePic.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="name">
                      {friend.firstName} {friend.lastName}
                    </div>
                  </div>
                  <div className="options" data-friend_id={friend._id}>
                    <div onClick={ignoreFriendRequest}>Ignore</div>
                    <div onClick={acceptFriend}>Accept</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="err">No Requests Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
