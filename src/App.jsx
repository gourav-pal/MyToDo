import React, { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";
import { Container } from "@mui/material";


  

const App=()=> {
  const [apiResponseData, setApiResponseData] = useState();
  const FetchTodo = async () => {
  const response = await axios.get(
    "https://firstdb-968a0-default-rtdb.firebaseio.com/todo.json"
  );
  setApiResponseData(response.data);
};

useEffect(() => {
  FetchTodo();
}, []);

const deleteToDo = async (ItemId) => {
  await axios.delete(
    "https://firstdb-968a0-default-rtdb.firebaseio.com/todo/" + ItemId + ".json"
  );
  FetchTodo();
};
  return (
    <>
      <Header />
      <Container sx={{ paddingTop: "100px" }}>
        <CreateToDo FetchTodo={FetchTodo} />
        <ToDo
          apiResponseData={apiResponseData}
          FetchTodo={FetchTodo}
          deleteToDo={deleteToDo}
        />
      </Container>
    </>
  );
}

export default App;
