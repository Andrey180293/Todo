import React, { useState, useEffect, useContext } from "react";
import "./PopUp.scss";
import "../../TodoTasks/AddTaskForm/AddTaskForm.scss";

import * as axios from "axios";
import Preloader from "../../Preloader/Preloader";
import { ContextApp } from "../../reducer";

const Add = () => {
  const { isLoading, lists, setLoad, setLists } = useContext(ContextApp);

  let MainTaskInput = React.createRef();
  const [coloradd, colorSelect] = useState("blue");
  const [nameText, nameAdd] = useState(null);

  const AddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  let Onaddzad = () => {
    if (MainTaskInput.current.value == "") {
      MainTaskInput.current.placeholder = "Please add the text";
      return;
    }
    setLoad(false);
    axios
      .post("http://localhost:3001/list", {
        color: coloradd,
        name: nameText,
      })
      .then(({ data }) => {
        const listObj = { ...data, tasks: [] };
        AddList(listObj);
        setLoad(true);
      });
    MainTaskInput.current.value = "";
  };
  let Addname = (event) => {
    let action = event.target.value;
    nameAdd(action);
  };
  let ColorChange = (event) => {
    let action = event.target.value;
    colorSelect(action);
  };
  useEffect(() => {
    return <Preloader />;
  }, [!isLoading]);

  return (
    <>
      {!isLoading ? <Preloader /> : null}
      <input
        className="field"
        ref={MainTaskInput}
        onChange={Addname}
        placeholder=""
        autoFocus={true}
      ></input>

      <div className="colors">
        <button className="targ red" onClick={ColorChange} value="red"></button>
        <button
          className="targ blue"
          onClick={ColorChange}
          value="blue"
        ></button>
        <button
          className="targ yellow"
          onClick={ColorChange}
          value="yellow"
        ></button>
        <button
          className="targ green"
          onClick={ColorChange}
          value="green"
        ></button>
        <button
          className="targ purple"
          onClick={ColorChange}
          value="purple"
        ></button>
        <button
          className="targ black"
          onClick={ColorChange}
          value="black"
        ></button>
        <button
          className="targ cadetblue"
          onClick={ColorChange}
          value="cadetblue"
        ></button>
      </div>
      <button className="button" onClick={Onaddzad}>
        ADD
      </button>
    </>
  );
};
export default Add;
