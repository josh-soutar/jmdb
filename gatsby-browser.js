import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers/rootReducer";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
