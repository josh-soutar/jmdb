const initialState = {
  search_results: [],
  posts: ["dummy data as an example"],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === "UPDATED_SEARCH_RESULTS") {
    return {
      ...state,
      search_results: action.search_results,
    };
  }

  if (action.type === "SELECTED_SEARCH_CATEGORY") {
    const updatedState = {
      ...state,
    };
    updatedState.search_results.forEach((result) => {
      result.selected = result.label == action.chosen_category;
    });
    return updatedState;
  }

  return state;
};

export default rootReducer;
