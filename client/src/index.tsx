import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules";
import logger from "redux-logger";

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