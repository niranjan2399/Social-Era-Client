const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_POST":
      return {
        post: action.payload,
      };
    case "CREATE_POST":
      return {
        post: [action.payload, ...state.post],
      };
    case "UPDATE_POST":
      return {
        post: [
          ...state.post.filter((p) => p._id !== action.payload.post._id),
          action.payload.post,
        ],
      };
    case "DELETE_POST":
      return {
        post: [...state.post.filter((p) => p._id !== action.payload)],
      };
    default:
      return state;
  }
};

export default postReducer;
