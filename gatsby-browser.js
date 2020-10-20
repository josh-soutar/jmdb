import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers/rootReducer";

const store = createStore(rootReducer);

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
