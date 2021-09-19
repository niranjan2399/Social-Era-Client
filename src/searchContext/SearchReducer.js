const SearchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return { text: action.payload };

    default:
      return state;
  }
};

export default SearchReducer;
