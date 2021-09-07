import axios from "../axios";

export const fetchFriends = async (id) => {
  try {
    const res = await axios.get(`/users/friends/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addFriend = async (id, data) => {
  try {
    const res = await axios.put(`/users/add-friend/${id}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const removeFriend = async (id, data) => {
  try {
    const res = await axios.put(`/users/remove-friend/${id}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const removeRequest = async (id, data) => {
  try {
    const res = await axios.put(`/users/remove-friend-request/${id}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
