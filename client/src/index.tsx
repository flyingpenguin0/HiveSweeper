import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
// redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
//axios
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "localhost:8000/" : "/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') 
);