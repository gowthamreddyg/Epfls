import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import appReducers from './Redux/appReducers.js';
import Charts from "./Components/Charts.js";
import './App.css';

let store = createStore(
    appReducers,
  applyMiddleware(thunk )
);

function App() {
  return (
  <Provider store={store}>
    <div className="App">
        <Charts />
    </div>
    </Provider>
  );
}

export default App;
