import "./App.scss";
import React, { useReducer } from "react";
import { ContextApp, initialState, reducer } from "./components/reducer";
import App from "./App";
function AppContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLoading = state.isLoading;
  const lists = state.lists;
  const activeItem = state.activeItem;

  const setLoad = (payload) => dispatch({ type: "SET_LOAD", payload });
  const setLists = (payload) => dispatch({ type: "SET_LISTS", payload });
  const setActiveItem = (payload) =>
    dispatch({ type: "SET_ACTIVE_ITEM", payload });

  return (
    <ContextApp.Provider
      value={{ isLoading, lists, activeItem, setLoad, setLists, setActiveItem }}
    >
      <App />
    </ContextApp.Provider>
  );
}

export default AppContainer;
