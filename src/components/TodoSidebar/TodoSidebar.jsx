import React from "react";
import List from "./List/List";
import PopUp from "./AddList/PopUp";
import "./TodoSidebar.scss";

const TodoSidebar = () => {
  return (
    <div className="todo_sidebar">
      <List />

      <PopUp />
    </div>
  );
};
export default TodoSidebar;
