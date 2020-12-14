import React, { useEffect, useContext } from "react";
import "./List.scss";
import "../AddList/PopUp.scss";

import className from "classnames";
import * as axios from "axios";
import Preloader from "../../Preloader/Preloader";
import { ContextApp } from "../../reducer";
import { NavLink, Route } from "react-router-dom";
import ListItem from "./ListItem";

const List = () => {
  const {
    isLoading,
    lists,
    setLoad,
    setLists,
    activeItem,
    setActiveItem,
  } = useContext(ContextApp);
  const onClickItem = (item) => {
    setActiveItem(item);
  };

  let onRemove = (item) => {
    //  if (window.confirm('You are ready want remove this list'))
    setLoad(false);

    return axios.delete(`http://localhost:3001/list/${item.id}`).then(() => {
      item.tasks.map((taskItem) => {
        axios.delete(`http://localhost:3001/tasks/${taskItem.id}`);
        return taskItem;
      });

      const newLists = lists.filter(
        (ite) => ite.id !== item.id && ite.id !== ite.tasks.listId
      );
      setLists(newLists);
      setLoad(true);
    });
  };
  // }

  useEffect(() => {
    return <Preloader />;
  }, [!isLoading]);

  return (
    <div className="block_list">
      <NavLink to="/" activeClassName="activeTitle">
        {" "}
        <h2 className="title_list">All Tasks</h2>
      </NavLink>
      <ul className="todo_list">
        {lists &&
          lists.map((item, index) => (
            <li
              key={index}
              className={className(item.className, {
                active: activeItem && activeItem === item.id,
              })}
              onClick={onClickItem ? () => onClickItem(item) : null}
            >
              <Route path="/list/:id">
                <ListItem item={item} onRemove={onRemove} />
              </Route>
              <Route exact path="/">
                <ListItem item={item} onRemove={onRemove} />
              </Route>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
