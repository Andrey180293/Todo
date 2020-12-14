import "./TodoTasks.scss";
import axios from "axios";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import { ContextApp } from "../reducer";
import React, { useContext } from "react";
import TasksItem from "./TasksItem";
import ListItem from "../TodoSidebar/List/ListItem";
import { NavLink, Route } from "react-router-dom";

const TodoTasks = ({}) => {
  const { isLoading, setLoad, setLists, lists, activeItem } = useContext(
    ContextApp
  );

  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  const editTitle = () => {
    const newTitle = window.prompt("Назва списка", activeItem.name);
    if (newTitle) {
      axios
        .patch(`http://localhost:3001/list/${activeItem.id}`, {
          name: newTitle,
        })
        .catch("Не вийшло");
      onEditTitle(activeItem.id, newTitle);
    }
  };
  //<ListItem item={item} />

  return (
    <div className="todo_tasks">
      <Route exact path="/">
        {lists.map((item) => (
          <>
            <div className="title_block">
              <h2>
                <ListItem item={item} />
              </h2>
            </div>
            {item.tasks.map((taskitem) => (
              <>
                <TasksItem task={taskitem} setLists={setLists} lists={lists} />
              </>
            ))}
            <AddTaskForm
              activeItem={item}
              setLoad={setLoad}
              isLoading={isLoading}
              setLists={setLists}
              lists={lists}
            />
          </>
        ))}
      </Route>
      <>
        <div>
          {" "}
          {
            <div className="title_block">
              <div>
                {" "}
                <h2>
                  {" "}
                  {
                    <NavLink
                      style={{ color: activeItem && activeItem.color }}
                      to={`/list/${activeItem && activeItem.id}/${
                        activeItem && activeItem.name
                      }`}
                    >
                      {" "}
                      {activeItem && activeItem.name}
                    </NavLink>
                  }
                </h2>
              </div>
              <div>
                {" "}
                <img
                  onClick={editTitle}
                  className="pensil"
                  src="https://s1.iconbird.com/ico/2013/9/452/w512h5121380477001pen.png"
                />
              </div>
            </div>
          }
          {activeItem && activeItem.tasks.length === 0 && (
            <span>
              <h3>Задачi Вiдсутнi</h3>
            </span>
          )}{" "}
        </div>

        {activeItem &&
          activeItem.tasks.map((task) => {
            return <TasksItem task={task} setLists={setLists} lists={lists} />;
          })}
        <AddTaskForm
          activeItem={activeItem}
          setLoad={setLoad}
          isLoading={isLoading}
          setLists={setLists}
          lists={lists}
        />
      </>
    </div>
  );
};
export default TodoTasks;
/* <Route path="/task/:id">*/
