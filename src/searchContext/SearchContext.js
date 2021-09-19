import { createContext, useReducer } from "react";
import SearchReducer from "./SearchReducer";

const INITIAL_STATE = {
  text: "",
};

export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ text: state.text, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
