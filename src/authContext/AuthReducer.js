const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "ADD_FRIEND":
      return {
        ...state,
        user: {
          ...state.user,
          friendRequests: state.user.friendRequests.filter(
            (friend) => friend._id !== action.payload
          ),
          friends: [...state.user.friends, action.payload],
        },
      };
    case "REMOVE_FRIEND":
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.filter(
            (friend) => friend !== action.payload
          ),
        },
      };
    case "IGNORE_FRIEND":
      return {
        ...state,
        user: {
          ...state.user,
          friendRequests: state.user.friendRequests.filter(
            (friend) => friend._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
