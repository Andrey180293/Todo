import React, { useState, useEffect } from "react";
import axios from "axios";
import Preloader from "../../Preloader/Preloader";
import "../AddTaskForm/AddTaskForm.scss";

//import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ activeItem, lists, setLoad, isLoading, setLists }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState("");

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: activeItem.id,
      text: inputValue,
      completed: false,
    };
    setIsDisabled(true);
    setLoad(false);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        onAddTask(activeItem.id, data);
        toggleFormVisible();
      })
      .catch((e) => {
        alert("Ошибка при добавлении задачи!");
      })
      .finally(() => {
        setIsDisabled(false);
        setLoad(true);
      });
  };

  useEffect(() => {
    return <Preloader />;
  }, [!isLoading]);

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <span className="add-task-span">Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={isDisabled} onClick={addTask} className="button">
            {isDisabled ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button-close">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
