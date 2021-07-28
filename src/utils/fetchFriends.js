import axios from "axios";

const fetchFriends = async (id) => {
  try {
    const res = await axios.get(`/users/friends/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchFriends;
