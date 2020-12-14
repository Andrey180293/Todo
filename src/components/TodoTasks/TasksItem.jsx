import "./TodoTasks.scss";
import React from "react";
import axios from "axios";

const TasksItem = ({ task, setLists, lists }) => {
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу");
      });
    }
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, {
        completed,
      })
      .catch(() => {
        alert("Не удалось обновить задачу");
      });
  };

  return (
    <>
      <div className="todo_tasks_item" key={task.id}>
        <input
          onChange={(e) => {
            onCompleteTask(task.listId, task.id, e.target.checked);
          }}
          checked={task.completed}
          id={`inputCompleted${task.id}`}
          type="checkbox"
          className="inputCompleted_checkbox"
        />
        <label htmlFor={`inputCompleted${task.id}`}></label>{" "}
        <div className={task.completed && "taskComleted"}> {task.text}</div>
        <img
          className="todo_tasks_item_remove"
          onClick={() => {
            onRemoveTask(task.listId, task.id);
          }}
          src="data:image/png;base64,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"
        />
      </div>
    </>
  );
};
export default TasksItem;
/* <NavLink to={"/task/" + lists.name + "/" + task.id}>
            {task.text}
          </NavLink> */
