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
  } else if (action.type === "SELECTED_SEARCH_CATEGORY") {
    const stateClone = {
      ...state,
      search_results: [...state.search_results],
    };
    //Update search_results with updated 'selected' value on chosen category
    stateClone.search_results.forEach((result) => {
      result.selected = result.label === action.chosen_category;
    });

    return {
      ...state,
      search_results: stateClone.search_results,
    };
  }

  return state;
};

export default rootReducer;
