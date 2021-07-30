import { createContext, useReducer } from "react";
import PostReducer from "./postReducer";

const INITIAL_STATE = {
  post: null,
  error: false,
  isFetching: false,
};

export const PostContext = createContext(INITIAL_STATE);

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);

  return (
    <PostContext.Provider
      value={{
        post: state.post,
        error: state.error,
        isFetching: state.isFetching,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
