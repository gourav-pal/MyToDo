import React, { useEffect, useState } from "react";
import axios from "axios";

const ToDo = ({apiResponseData, FetchTodo, deleteToDo}) =>{
    
  return (
    <div>
      {apiResponseData &&
        Object.keys(apiResponseData).map((key) => {
          const { task, description, priority, date } = apiResponseData[key];
          return (
            <div className={`to-do-item ${priority}`}>
              <div className="to-do-item-left">
                <h4>{task}</h4>
                <p>{description}</p>
              </div>
              <div className="to-do-item-right"></div>
              <p>{date}</p>
              <button className="todo-delete" onClick={()=>deleteToDo(key)}>❌</button>
            </div>
          );
        })}
    </div>
  );
};

export default ToDo;
