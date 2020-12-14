//initialise local storage
if (!localStorage.getItem("homepage_category")) {
  localStorage.setItem("homepage_category", "movies");
}

const initialState = {
  search_results: [],
  homepage_category: localStorage.getItem("homepage_category"),
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
  } else if (action.type === "SELECTED_HOMEPAGE_CATEGORY") {
    return {
      ...state,
      homepage_category: action.homepage_category,
    };
  }

  return state;
};

export default rootReducer;
