import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./components/navbar";
import UserDialog from "./components/dialog";
import AddItem from "./components/addItem";
import * as serviceWorker from "./serviceWorker";
import "./css/main.css";

ReactDOM.render(
  <React.Fragment>
    <UserDialog />
    <NavBar />
    <AddItem />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
