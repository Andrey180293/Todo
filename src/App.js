import "./App.scss";
import React, { useEffect, useContext } from "react";
import * as axios from "axios";
import TodoSidebar from "./components/TodoSidebar/TodoSidebar";
import TodoTasks from "./components/TodoTasks/TodoTasks";
import Preloader from "./components/Preloader/Preloader";
import { ContextApp } from "./components/reducer";

function App() {
  const { isLoading, setLoad, setLists } = useContext(ContextApp);

  useEffect(() => {
    setLoad(false);
    axios.get(`http://localhost:3001/list?_embed=tasks`).then(({ data }) => {
      setLists(data);
      setLoad(true);
    });
  }, []);

  useEffect(() => {
    return <Preloader />;
  }, [isLoading === null]);

  if (!isLoading) {
    return <Preloader />;
  }

  return (
    <div className="todo">
      <TodoSidebar />
      <TodoTasks />
    </div>
  );
}

export default App;
