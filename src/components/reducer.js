import React from "react";
export const ContextApp = React.createContext();

export const initialState = {
  lists: [],
  isLoading: null,
  activeItem: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOAD":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_LISTS":
      return {
        ...state,
        lists: action.payload,
      };
    case "SET_ACTIVE_ITEM":
      return {
        ...state,
        activeItem: action.payload,
      };

    default:
      return state;
  }
};
