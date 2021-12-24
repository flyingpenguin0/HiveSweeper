import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'localhost:8000/' : '/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

