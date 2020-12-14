import React, { useState } from "react";
import Add from "./Add";
import "./PopUp.scss";

const PopUp = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);

  return (
    <div className="add-list">
      <span className="add-task-span" onClick={() => setVisiblePopup(true)}>
        ДОБАВИТЬ ЗАДАЧУ
      </span>

      {visiblePopup && (
        <div className="add-list_popup">
          <Add />

          <button
            className="button button-close"
            onClick={() => setVisiblePopup(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
export default PopUp;
