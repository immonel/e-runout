import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import statusReducer from './reducers/statusReducer'
import configReducer from './reducers/configReducer';
import measurementsReducer from './reducers/measurementsReducer';

const store = configureStore({
  reducer: {
    status: statusReducer,
    config: configReducer,
    measurements: measurementsReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
